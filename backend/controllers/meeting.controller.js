import { nanoid} from 'nanoid';
import crypto from 'crypto';
import Schedule from '../models/schedule.model.js';

const scheduleDetails = new Schedule();
export async function scheduleMeeting(req,res){
    const { title, desc, startTime, duration} = req.body;
    // Generate Meeting ID
    const meetingID = nanoid(12); 

    // Generate Meeting Password
    const meetingPassword = crypto.randomBytes(4).toString('hex'); 

    console.log({ meetingID, meetingPassword });
    const scheduleDetails = new Schedule({
        title: title,
        description: desc,
        startTime: startTime,
        duration: duration,
        isHost: true,
        user: req.session.user.username,
        meetingId: meetingID,
        password: meetingPassword
    });
    await scheduleDetails.save();
    res.send(scheduleDetails);
}
export async function meetingDetails(req,res){
    const meetingDetails = await Schedule.find({user: req.session.user.username});
    if(meetingDetails){
        console.log('meeting details: ',meetingDetails);
        res.send(meetingDetails);
    }
    else{
        console.log('cannot find meeting details of ',req.session.user);
    }
    
}
export async function getMeetingId(req,res){
    const id = req.params;
    console.log('meeting id: ',meetingId);
    const meetingId = await Schedule.find({meetingId: id});
    res.send(meetingId);
}
export async function deleteMeeting(req,res){
   const { id } = req.body;
   console.log('meeting id: ',id)
    await Schedule.findOneAndDelete({meetingId: id});
    console.log('deleted');
    res.send({isDeleted: true});
}