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