import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'
const saltRounds = 10;
export async function login(req,res){
    const { email, password } = req.body;
    if(email && password){
        const data = await User.findOne({email: email});
        console.log('data:',data.password);
        const hash = data.password;
        //   Load hash from your password DB.
        bcrypt.compare(password, hash, function(err, result) {
            if(result){
                console.log('result: ',result);
                // res.send(result);       
                req.session.user = { username: email, role: data.role };
                console.log('name: ',req.session.user.username);
                console.log('cookie: ',req.session);
                // res.redirect('./index.html');
                // res.send({'message': 'User logged in and session data saved'});
                req.session.save(function (err) {
                    if (err){
                        console.log(err);
                        return next(err)
                    } 
                    res.send({valid: true});
                  })
            }
            else{
                res.send({valid: false});
            }
        });
    }
    else{
        res.send({'error': 'please fill all the fields'});
    }
  
   
   
}

export async function register(req,res){
    const { name, email, password } = req.body;
    const adminEmail = 'pratikgiri2320@gmail.com';
    let role = 'user';
    if(name && email && password){
        
        const user = await User.findOne({email: email});
        if(!user){
            if(adminEmail == email){
                role = 'admin';
            }
            console.log('name: ',user);
            // jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
            //     console.log(token);
            //   });
            bcrypt.genSalt(saltRounds, async function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    // Store hash in your password DB.
                    console.log("password: ",hash);
                    const user = new User({
                        name: name,
                        email: email,
                        password: hash,
                        role: role
                    });
                    await user.save();
                });
            });
            res.status(200).json({msg: 'success'});
           
        }
        else{
            console.log('name: ',user);
            res.send({'error': 'this username already exists'});
        }
        
    }
    else{
        res.send('please fill all the fields');
    }
    


}
export async function checkSession(req,res){
    if(req.session.user){
        console.log('session found');
        res.send({name: req.session.user, loggedIn: true})
       
    }        
    else{
        console.log('session not found');
        res.send({loggedIn: false, user: req.session.user});
       
    }
        
}