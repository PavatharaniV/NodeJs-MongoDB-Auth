const jwt = require('jsonwebtoken');
const User = require('../models/user')
const sharp = require('sharp');
const cloudinary = require('../helper/imageupload');
const { parse } = require('dotenv');

exports.createUser = async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;

  const isNewUser = await User.isThisEmailInUse(email);
  if (!isNewUser)
    return res.json({
      success: false,
      message: 'email already in use'
    });
  const user = await User({
    fullname,
    email,
    password,
    confirmPassword
  });
  await user.save()
  res.json({success:true,user});
}

exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password);

  const user = await User.findOne({ email });

  if (!user) return res.status(401).json({ success: false, message: 'user not found , with the given email!' });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.json({ success: false, message: 'email/password mismatch  ' })

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

  let oldTokens = user.tokens || []

  if(oldTokens.length){
   oldTokens = oldTokens.filter(t => {
     const timeDiff = (Date.now() - parseInt( t.signedAt)) / 1000

     if(timeDiff < 86400){
      return t
     }
    })
  }

  await User.findByIdAndUpdate(user._id,{ tokens: [{token, signedAt: Date.now().toString()}]})

  const userInfo = {
    fullname: user.fullname,
    email:user.email,
    avatar:user.avatar?user.avatar : '',
  }

 
  
  res.json({ success: true, user:userInfo, token })

}

exports.uploadProfile = async (req, res) => {
  const { user } = req;
  if (!user) return res.status(401).json({ success: false, message: 'unauthorized access!' });



  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${user._id}_profile`,
      widhth: 500,
      height: 500,
      crop: 'fill'
    })
    
    await User.findByIdAndUpdate(user._id, { avatar :result.url })
    res.status(201).json({ success: true, message: 'Your profile has updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error, try after sometime' });
    console.log('Error uploading profile picture', error.message)
  }
}



exports.signOut = async (req,res)=>{
  if(req.headers && req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1]
    if(!token){
      return res.json({success:false,message:'Authorization fail!'});
    }

    const tokens = req.user.tokens;

    const newToken = tokens.filter(t => t.token !== token)

    await User.findByIdAndUpdate(req.user._id,{tokens:newToken})
    res.json({success:true,message:'signout successfully!'})
  }
}