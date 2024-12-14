import React, { useEffect, useRef, useState } from 'react'
// import { startMeeting } from '../../services/MediaSoup/client'
import socket from "../../services/Socket/socket";
import { initializeDevice } from '../../services/MediaSoup/initializeDevice';
import { chatroom } from '../../services/MediaSoup/room';
import { forwardRef } from 'react';

const AudioStream = ({mediaStream}) => {
     const remoteAudioRef = useRef(null);

  useEffect(() => {
    if (remoteAudioRef.current && mediaStream) {
      remoteAudioRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  return (
    <audio
      ref={remoteAudioRef}
      autoPlay
    />
  );
}

const VideoStream = forwardRef(function VideoStream (props,remoteVideoRef) {
    // const remoteVideoRef = useRef({});

  useEffect(() => {
    if (remoteVideoRef.current[props.id] && props.mediaStream) {
      remoteVideoRef.current[props.id].srcObject = props.mediaStream;
    }
  }, [props.mediaStream]);

  return (
    <video
    ref={(el) => (remoteVideoRef.current[props.id] = el)}
    defaultValue={props.type}
    autoPlay
    playsInline
    muted={false} // Change to true if you want the video to be muted
    className="w-[200px] h-[150px] bg-white rounded-xl"
    />
  );
})

const VideoRoom = () => {
    const [remoteType, setRemoteType] = useState([]);
    const [producerTransport, setProducerTransport] = useState(null);

    const addRemoteType = ({stream,type,id}) => {
        console.log('stream add: ',stream)
        console.log('type: ',type)        
        setRemoteType((prev) => [...prev, {stream,type,id}])        
    }

    const leaveMeeting = () => {

    }

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef({});

    const displayMediaOptions = {
        video: {
          displaySurface: "window",
        },
        audio: {
          suppressLocalAudioPlayback: false,
        },
        preferCurrentTab: false,
        selfBrowserSurface: "exclude",
        systemAudio: "include",
        surfaceSwitching: "include",
        monitorTypeSurfaces: "include",
      };


    let rtpCapabilities;
    let device;
    let sendTransport;
    let recvTransport;
    let videoProducer;
    let audioProducer;
    let screenProducer;

    let consumer;
    let consumerTransports = [];
    let videostream;

    const roomId = 'dLlwcM757iXm';
    const userName = 'Pratik'
    console.log('roomid: ',roomId);

    useEffect(() => {
     console.log('remote type: ',remoteType)
    }, [remoteType])
    

    useEffect(() => {
        // connect the socket
        const init = async () => {
            socket.connect();      
        
        //get your local media stream
       
          localVideoRef.current.srcObject = await navigator.mediaDevices.getUserMedia({video: true});
        

        //load device
                rtpCapabilities = await chatroom(roomId, userName);
                console.log('routerRtpCapabilities: ',rtpCapabilities);
                device = await initializeDevice();
                console.log('device: ',device);
                // console.log('rtpCapabilities: ',rtpCapabilities);
                const routerRtpCapabilities = rtpCapabilities;
                await device.load({routerRtpCapabilities});
                console.log('device rtpCapabilities',device.rtpCapabilities);
                
                createSendTransport();
        
        socket.on('newProducer',({producerId}) => {
            console.log("inform about new producer: ",producerId);
            newConsumer(producerId);
        })
        socket.on('producer-closed', (remoteProducerId) => {
            // server notification is received when a producer is closed
            // we need to close the client-side consumer and associated transport
            console.log('producer-closed event: ',consumerTransports);
            console.log('remoteProducerId: ',remoteProducerId);
            const producerToClose = consumerTransports.find(transportData => transportData.producerId === remoteProducerId);
            console.log('producerToClose: ',producerToClose);
            producerToClose.recvTransport.close()
            producerToClose.consumer.close()
            
            // remove the consumer transport from the list
            consumerTransports = consumerTransports.filter(transportData => transportData.producerId !== remoteProducerId)
          
            // remove the video div element
            // document.querySelector('.video').removeChild(document.getElementById(`td-${remoteProducerId}`));
          })
     
    }
    init();
    return () => {
        socket.close();
      };
    }, [])



    
    // create send transport
    async function createSendTransport(){
        if(!device)
            console.log("Device not initialized");
    
        socket.emit('createTransport',{rtpCapabilities: device.rtpCapabilities,consumer: false},async (params) => {
            console.log("Params from send tranport: ",params);
            try{
                sendTransport = await device.createSendTransport(params);
                setProducerTransport(sendTransport);
                sendTransport.on('connect',async ({dtlsParameters},callback,errback) => {
                    console.log("dtlsparameters: ",dtlsParameters);
                    try{
                        console.log("producer connect event")
                        socket.emit('producer-connect',{
                            id: sendTransport.id,
                            dtlsParameters
                        })
                        callback();
                    } catch(err){
                        console.log("Error emitting produce-connect: ",err);
                        errback(err);
                    }
                })
    
                sendTransport.on('produce',async (parameters,callback,errback) => {
                    try{
                        console.log('produce event')
                        const { id } = socket.emit('produce',{
                            id: sendTransport.id,
                            kind: parameters.kind,
                            rtpParameters: parameters.rtpParameters
                        },({id,producerExists}) => {
                            console.log("producer exists: ",producerExists);
                            callback({id});
    
                            if(producerExists) getProducers();
                        }) 
                        
                    } catch(err){
                        errback(err);
                    }
                })
    
                sendTransport.on('icestatechange',(state) => {
                    console.log("IceStateChange: ",state);
                })
    
                sendTransport.on('connectionstatechange',(state) => {
                    console.log("ConnectionStateChange: ",state);
                })
    
                await produceMedia();
    
            } catch(err){
                console.log("Error creating sendTransport: ",err);
            }
            
        })
       
    }
    //produce media
    async function produceMedia(){
        console.log("producing media")
        const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100,
            suppressLocalAudioPlayback: true,
        }});
        
        // localVideo.srcObject = stream;
        const videoTrack = stream.getVideoTracks()[0];
        const audioTrack = stream.getAudioTracks()[0];
        
       
        // console.log(track)
        try{
            console.log('before producing')
            videoProducer = await sendTransport.produce({
                track: videoTrack,
               
    
            });
            audioProducer = await sendTransport.produce({track: audioTrack});
            
            console.log("produced media")
            
        } catch(err){
            console.log("error in producing media: ",err);
        }  
        videoProducer.on('trackended',() => {
            console.log('A track ended.');
        })
        videoProducer.on('transportClose', () => {
            console.log('video transport ended');
        })
    }
    async function shareScreen(){
     
        console.log('share screen')
        const screenCapture = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        console.log('screen capture: ',screenCapture);
        
        if(screenCapture){
            console.log('producing screen capture')
            const screenTrack = screenCapture.getVideoTracks()[0];
            console.log('screen track: ',screenTrack)
            console.log('send transport : ',producerTransport)
            try{
                screenProducer = await producerTransport.produce({
                    track: screenTrack,
                   
                });
            }catch(err){
                console.log("screen capture failed: ",err);
            }
            
            console.log('screen shared');
        }
        
    }

    //get producers list
    async function getProducers(){
        console.log('producer exists');
        socket.emit('getProducers',{},({producerList}) => {
            console.log("Producer ids: ",producerList);
            producerList.forEach(element => {
                console.log("you are both producer and consumer")
                newConsumer(element);
            });
        })
    }
    //new consumer
    let consumingTransports = [];
async function newConsumer(remoteProducerId){
    if(!device)
        console.log("Device not initialized");
    if(consumingTransports.includes(remoteProducerId)) 
        {
            console.log("already consumed");
            return;
            
        }
        else{
            console.log('pusing into consuming transports')
            consumingTransports.push(remoteProducerId);
        }
    
   
        
            socket.emit('createTransport',{rtpCapabilities: device.rtpCapabilities,consumer: true},async (params) => {
        
                try{                
                    recvTransport = await device.createRecvTransport(params);
                    console.log("recv transport created: ",params);

                    recvTransport.on('connect',async ({dtlsParameters},callback,errback) => {
                        try{
                            console.log('consumer connect');
                            socket.emit('consumer-connect',{    

                                dtlsParameters,
                                consumerTransportId: params.id
                            })
                            callback();
                        } catch(err){
                            console.log("Error emitting consumer-connect: ",err);
                            errback(err);
                        }
                    })
               
                    recvTransport.on('connectionstatechange',(state) => {
                        console.log("Consumer ConnectionStateChange: ",state);
                    })

                    console.log("calling consume");                  
                    console.log("remote producer id: ",remoteProducerId);

                    await consume(remoteProducerId,params.id,recvTransport);              
                  
                    
                } catch(err){
                    console.log("error in recv transport: ",err);
                }
            })  
    
}


  
// consumer 
async function consume(remoteProducerId,consumerTransportId,recvTransport){
    console.log("consume...");
        socket.emit('consume',{rtpCapabilities: device.rtpCapabilities,remoteProducerId,consumerTransportId},async (params) => {
            try{
                console.log("before consuming")
                console.log('producerId: ',params.producerId);

                consumer = await recvTransport.consume({
                    id: params.id,
                    producerId: params.producerId,
                    kind: params.kind,
                    rtpParameters: params.rtpParameters
                });
                consumerTransports = [
                    ...consumerTransports,
                    {
                        recvTransport,
                        consumer,
                        producerId: remoteProducerId,
                        serverConsumerTransportId: consumerTransportId
                    }
                ]
                console.log('track')
                // Render the remote video track into a HTML video element.
                const { track } = consumer;
                console.log(track);                             

                const stream = new MediaStream([ track ]);

                addRemoteType({stream,type:params.kind, id: remoteProducerId});
                // console.log('remote type: ',remoteType)
                if(videostream){
                    console.log('remote stream: ',videostream);
                    // remoteVideoRef.current.srcObject = stream;
                }
                socket.emit('resume',params.id);
            } catch(err){
                console.log("error consuming: ",err);
            }
        })        
    
}









  return (
    <div className='h-screen p-8 w-2/3'>
        <div className='bg-zinc-800 w-full h-[90%] flex flex-wrap justify-evenly items-center p-4 rounded-2xl'>
            <video
            id='localVideo'
            ref={localVideoRef}
            className='w-[200px] h-[150px] bg-white rounded-xl'
            autoPlay playsInline ></video>
            
            <div>                   
            {remoteType.filter((elem) => elem.type == 'video').map(({stream,type,id}) => {
                return <VideoStream key={stream.id} mediaStream={stream} type={type} id={id} ref={remoteVideoRef}/>                
            })}
            </div> 
            <div>                   
            {remoteType.filter((elem) => elem.type == 'screen').map(({stream,type}) => {
                return <VideoStream key={stream.id} mediaStream={stream} type={type} />                
            })}
            </div> 
            <div >   
            {remoteType.filter((elem) => elem.type == 'audio').map(({stream}) => {
               return <AudioStream key={stream.id} mediaStream={stream} />        
            
            })}
            </div>
            
            
        </div>
        <div className='flex justify-between items-center mt-4 text-white'>
            <div className='flex gap-4'>
                <button
                 className='bg-[#044c69] px-4 py-2'>Start</button>
                <button className='bg-[#044c69] px-4 py-2'>Audio</button>
                <button className='bg-[#044c69] px-4 py-2'>Video</button>
            </div>
            <div className='flex gap-4'>
                <button
                onClick={shareScreen}
                className='bg-[#044c69] px-4 py-2'>Share Screen</button>
                <button className='bg-[#044c69] px-4 py-2'>Chats</button>
            </div>
            <div className='flex gap-4'>
                <button 
                onClick={leaveMeeting}
                className='bg-[#044c69] px-4 py-2'>Leave</button>
                <button className='bg-[#044c69] px-4 py-2'>End</button>
            </div>
        </div>
    </div>
  )
}

export default VideoRoom
export {socket}
