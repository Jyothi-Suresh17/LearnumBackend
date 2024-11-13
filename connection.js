
const mongoose =require('mongoose');

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
  // console.log(process.env);
  
  console.log("Connected to MongoDB Successfully!!!!")
}).catch((err)=>{
  console.log(`Error connecting to MongoDB due to ....${err}`)
})

