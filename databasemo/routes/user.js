const express = require('express');

const router = express.Router();
const {createUser, userSignIn, uploadProfile, signOut} = require('../controllers/user')
const {userValidation, validateUserSignUp, validateUserSignIn} = require('../middleware/Validation/user');
const { isAuth } = require('../middleware/auth');

const User = require('../models/user');
const multer = require('multer');

const storage = multer.diskStorage({});


const fileFilter = (req,file,cb) =>{
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }
    else{
        cb('invalid image file!', false);
    }
}

const uploads = multer({storage,fileFilter})

{profile:'image'}


router.post('/create-user',validateUserSignUp,userValidation, createUser);
router.post('/sign-in',userSignIn,validateUserSignIn,userValidation);
router.post('/sign-out',isAuth,signOut)
/*router.post('/create-post',isAuth,(req,res)=>{
   //create a post
   res.send('you are in a secured route')
})*/

router.post('/upload-profile',isAuth,uploads.single('profile'),uploadProfile);

module.exports = router;