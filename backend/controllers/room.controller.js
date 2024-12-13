import Schedule from '../models/schedule.model.js';
export function createRoom(){

}
export async function joinRoom(req,res){
    const {meetingId, password} = req.body;
    const id = await Schedule.find({meetingId, password});
    // Check if the room ID is in the list of valid rooms
    if (id) {
      return res.json({ valid: true });
    } else {
      return res.json({ valid: false });
    }
}
export function leaveRoom(){

}