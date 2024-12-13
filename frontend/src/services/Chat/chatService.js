import {socket} from '../../components/MeetingRoom/VideoRoom'
export async function message(text){
    // const socket = window.socketService.getSocket();
   
    console.log('socket: ', socket);
    // remoteUserId = socket.id;
    // if (!socket) {
    //     console.warn('Socket not initialized, queuing message');
    //     return;
    // }
        try {
            console.log('Sending message:', text);
            socket.emit('chat', {
                content: text,
                timestamp: Date.now()
            });
        } catch (error) {
            console.error('Error sending message:', error);
            
        }         
    
   
}
export async function recvChat(recvMessage){
    
   
    socket.on('recvChat',({msg,userId}) => {
        console.log('msg received: ',msg);
       recvMessage(msg);
        // displayMessage(msg,socket.id,userId);
    })
   
} 