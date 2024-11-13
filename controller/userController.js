
const users = require("../model/userModel");
const jwt =require('jsonwebtoken')



//register
exports.registerController = async (req, res) => {
  const { username, email, password } = req.body;

  console.log(`username: ${username}, email: ${email}, password: ${password}`);

  try {
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(406).json('User already exists !!');
    } else {
      // Check if the email matches the specific admin email
      const isAdmin = email === 'jyothisuresh0614@gmail.com';

      const newUser = new users({
        username,
        email,
        password, // Plain password (consider hashing for security)
        role: isAdmin ? 'admin' : 'user', // Set role to 'admin' for the specific email
      });

      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(401).json(`Registration failed due to ${error}`);
  }
};


//login
exports.loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await users.findOne({ email, password });
    

    if (existingUser) {
      const token = jwt.sign({ userId: existingUser._id }, "supersecretkey");
      // const role = existingUser.role;
      // console.log(role);
      console.log(existingUser.role);
      
      
      res.status(200).json({ existingUser, token });

    } else {
      res.status(406).json('Invalid email or password !!');
    }
  } catch (error) {
    res.status(401).json(`Login failed due to ${error}`);
  }
};

exports.getallUsersController = async(req,res)=>{
  try {
    const allUsers = await users.find();
    if(allUsers){
      res.status(200).json(allUsers);
    }
    else{
      res.status(406).json('No users found !!');
      }
    
    } catch (error) {
      res.status(401).json(error)
    }
}


//delete user

exports.deleteUserController = async(req,res)=>{

  console.log("Inside deleteUserController");
  const {userId} = req.params;
  console.log(userId);

  try {
    const user = await users.findByIdAndDelete({_id:userId});
    res.status(200).json(user)
    
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
  
  
}
