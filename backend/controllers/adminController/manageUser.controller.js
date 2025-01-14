import User from "../../models/user.model.js"
export const viewUser = async (req,res) => {
    try{
        const users = await User.find({});
        if(users){
            console.log(users.length)
            res.send(users);
        }
    }catch(err){
        res.send({error: `failed to get data: ${err}`});
    }
    
}
export const editUser = async (req,res) => {
    const { id } = req.params;
    const {name, email} = req.body;
    try{
        const result = await User.findByIdAndUpdate(id, {name, email}, {new: true});
        res.send({success: true});
    }catch(e){
        res.send(e);
    }
}
export const deleteUser = async (req,res) => {
    const { id } = req.body;
    try{
        const result = await User.findByIdAndDelete(id);
        if(result){
            res.send({result,msg: 'successfully deleted user'})
        }
    }catch(err){
        res.send(err)
    }
}