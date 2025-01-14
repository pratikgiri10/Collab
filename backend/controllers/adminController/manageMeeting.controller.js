import Schedule from "../../models/schedule.model.js"

export const viewScheduledMeetings = async (req,res) => {
    try{
        const meetings = await Schedule.find({});
        if(meetings){
            console.log(meetings.length);
            res.send(meetings)
        }
    }catch(err){
        res.send(err)
    }
}
export const editMeeting = async (req,res) => {
    const {id} = req.params;
    console.log('meeting id: ',id);
    const {title, desc:description, startTime, duration} = req.body;
    console.log(req.body);
    console.log(title)
   
    try{
        await Schedule.findOneAndUpdate({meetingId: id},{title, description, startTime, duration},{new: true});
        res.send({success: true});
    }catch(err){
        console.log(err);
        res.send({success: false});
    }
}
export const deleteMeeting = async (req,res) => {
    const { id } = req.body;
    try{
        const result = await Schedule.findByIdAndDelete(id);
        if(result){
            res.send(result);
        }
    }catch(err){
        res.send(err);
    }
}
export const deleteAllMeetings = async (req,res) => {
    try{
        const result = await Schedule.deleteMany({});
        if(result){
            res.send(result);
        }
    }catch(err){
        res.send(err);
    }
}