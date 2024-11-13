require('dotenv').config();//this method

const express = require('express');

const cors = require('cors');

const router =require('./routes')

const learnServer=express();

learnServer.use(cors());

learnServer.use(express.json());

//use router
learnServer.use(router);

//export uploads folder

learnServer.use('/uploads',express.static('./uploads'))

//connection[momgoose] file
require('./connection')

PORT = 4000 || process.env.PORT

learnServer.listen(PORT,()=>{
  console.log(`Port running successfully at ${PORT} !!!!`);
  
});

