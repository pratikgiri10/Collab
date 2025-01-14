import User from '../../models/user.model.js'
import Room from '../../models/meeting.model.js'
import Schedule from '../../models/schedule.model.js';
// export const getTotalUsers = async (req,res) => {
//     try{
//         const users = await User.find({});
//         if(users){
//             console.log(users.length)
//             res.send(users);
//         }
//     }catch(err){
//         res.send({error: `failed to get data: ${err}`});
//     }
// }
export const getRoomsDetail = async (req,res) => {
    try{
        const rooms = await Room.find({}).populate('participants').populate('host');
        if(rooms){
            console.log(rooms.length)
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
// export const getActiveSessions = async (req,res) => {
//     try{
//         const rooms = await Room.find({});
//         if(rooms){
//             console.log(rooms.length)
//             res.send(rooms);
//         }
//     }catch(err){
//         res.send({error: `failed to get data: ${err}`});
//     }
// }
