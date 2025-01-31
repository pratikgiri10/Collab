import User from '../../models/user.model.js'
import Room from '../../models/meeting.model.js'
import Schedule from '../../models/schedule.model.js';

export const getRoomsDetail = async (req,res) => {
    try{
        const rooms = await Room.find({}).populate(
            {
                path: 'host', 
                populate: {
                    path: 'host', 
                    select: 'name', // Optional: Select specific fields from the `Profile`
                },
            }
        ).populate('participants').exec();
        if(rooms){
            console.log(rooms)
            res.send(rooms);
        }
    }catch(err){
        res.send({error: `failed to get data: ${err}`});
    }
}
export const getActiveRoomsDetail = async (req,res) => {
    try{
        const rooms = await Room.find({});
        if(rooms){
            console.log(rooms.length)
            res.send(rooms);
        }
    }catch(err){
        res.send({error: `failed to get data: ${err}`});
    }
}
export const getActiveSessions = async (req,res) => {
    try{
        const rooms = await Schedule.find({status: 'active'}).populate('host').populate('participants');
        if(rooms){
            console.log(rooms)
            res.send(rooms);
        }
    }catch(err){
        res.send({error: `failed to get data: ${err}`});
    }
}
export const deleteRoom = async (req,res) => {
    const { id } = req.body;
    try{
        const result = await Room.findByIdAndDelete(id);
        if(result){
            res.send({isDeleted:true});
        }
        else{
            res.send({isDeleted: false})
        }
    }catch(err){
        res.send(err);
    }
}
