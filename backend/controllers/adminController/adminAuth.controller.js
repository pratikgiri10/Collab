import User from '../../models/user.model.js'
import bcrypt from 'bcrypt'
export const createInitialAdmin = async (req,res) => {
    const adminEmail = 'collab0310@gmail.com';
    const adminPassword = 'collab';
  
    // Check if admin already exists
    const existingAdmin = await User.findOne({ 
      email: adminEmail, 
      role: 'admin' 
    });
  
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      
      const adminUser = new User({
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
  
      await adminUser.save();
      console.log('Initial admin user created');
      res.send({email: adminEmail, password: hashedPassword, msg: 'Admin registered successfully'});
    }
}
export const Login = async (req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({ error: 'Please fill all the fields' });
    }
    const user = await User.findOne({email: email});
    if(user){
        const hash = user.password;
        bcrypt.compare(password,hash, function (err,result){
            if(result){
                req.session.user = {
                    username: email,
                    role: user.role
                }
                res.status(200).json({isAdmin: true});
            }
            else{
                res.json({err: "Invalid password"});
            }
        })
        
    }
    else{
        return res.status(401).json({ message: "Invalid credentials" });
    }
    
         
}