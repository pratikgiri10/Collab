import Schedule from '../models/schedule.model.js';
import User from '../models/user.model.js';
import Room from '../models/meeting.model.js';
export function createRoom(){

}
export async function joinRoom(req,res){
    const {meetingId, password} = req.body;
    const meeting = await Schedule.findOne({meetingId, password});
    console.log(meeting);
    if (meeting) {
     const { _id } = await User.findOne({email: req.session.user.username});
     console.log(_id)
     const user = await Room.findOneAndUpdate({roomId: meetingId}, {participants: _id}, {new: true});
     console.log('user update: ',user)
      return res.json({ valid: true });

    } else {
      return res.json({ valid: false });
    }
}

export async function getParticipants(req,res){
  const users = await Room.find({});
  console.log('participants: ',users)
}
export function leaveRoom(){

}