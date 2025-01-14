import User from '../../models/user.model.js'
export const updateProfile = async (req,res) => {
    const {id} = req.params;
    const username = req.session.username;
    const {name, email} = req.body;
    try{
        const result = await User.findByIdAndUpdate(id, {name, email}, {new: true});
        res.send({success: true});
    }catch(e){
        res.send(e);
    }
}
export const changePassword = async (req,res) => {
    const {oldPsw, newPsw} = req.body;
    const username = req.session.username;
    const result  = await User.findOneAndUpdate({name: username}, {password: newPsw}, {new: true});
}
export const changeLogo = async (req,res) => {
    
}