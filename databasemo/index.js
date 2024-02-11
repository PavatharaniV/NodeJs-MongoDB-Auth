const express  = require('express');
require('dotenv').config();

const userRouter = require('./routes/user');


//require('./models/db.js');

const User = require('./models/user')

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('our db is connected')
}).catch(err => console.log(err.message));

const app = express()

/*app.use((req,res,next)=>
{
  req.on('data',(chunk)=>{
    const data = JSON.parse(chunk);
    req.body = data;
    next();
   })
  
});*/

app.use(express.json());
app.use(userRouter);

const test = async (email,password)=>{
  const user = await User.findOne({email:email});
  const result = await user.comparePassword(password);
  console.log(result);

}

test('shiyam112hvhb@gmail.com','123shiyam'); 
 
app.get('/test',(req,res)=>{
  res.send('Hello')
})

 
app.get('/',(req,res) => { 
    res.json({ success:true,message:'Welcome'}); 
});

app.listen(8080,() =>{
  console.log("port is listening");
});  

//mongodb+srv://pava:<password>@cluster0.pxg28zg.mongodb.net/?retryWrites=true&w=majority
 