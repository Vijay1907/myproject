const path=require('path')
const dotenv= require('dotenv');
dotenv.config({ path: __dirname + "/.env" });
const {mongoutil}= require(path.join(__dirname,'/database/db.js'))
const express=require('express')
let app =express();
const bodyParser=require('body-parser');
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

const collection = process.env.COLLECTION;
const port= process.env.PORT;


 mongoutil.connectToServer((err)=>{
    if(!err){
        console.log("connected to database")
   
    }else{
        console.log("Oops, Cannot connect with database")
    }
 }) 


 // 1. main
app.get('/userdata',async(req,res)=>{
  const db =mongoutil.getDb();
  if(db){
    const {email} =req.query
    if(email){
      let data= await db.collection(collection).findOne({userEmail: email},{projection:{_id:0}});
      if(!data){
        res.status(404).send({message : "Oops, Some error occured" ,success: false});
      }else{
        res.status(200).send(data)
      }
    }else{
      res.status(404).send({message : "Oops, Some error occured" ,success: false});
    }
    
  }else{
    res.status(404).send({message:"databse is not connected",success: false})
  }
   
})

// 2. main
app.put('/updateuser', async(req,res)=>{
  let {userName,userEmail, userContact, businessContact, businessName, password, country, city, address} = req.body;
    let db =mongoutil.getDb();
    if(db){
      if(Object.keys(req.body).length>8){
        data = await db.collection(collection).updateOne({userEmail: userEmail},{$set : {
          userName: userName,
          userContact: userContact,
          businessContact: businessContact,
          businessName: businessName,
          password: password,
          country: country,
          city: city,
          address: address}})
          if(data.acknowledged){
            res.status(200).send({message: "updated",success: true})
          }else{
            res.status(404).send({message : "Oops, Some error occured" ,success: false});
          }
      }else{
        res.status(404).send({message : "Oops, Some error occured" ,success: false});
      }
    }else{
      res.status(404).send({message:"databse is not connected",success: false})
    }
  })

  // 3. main
  app.post('/adduserdata', async(req,res)=>{
    let {userName,userEmail, userContact, businessContact, businessName, password, country, city, address} = req.body;
    let db =mongoutil.getDb();
    if(db){
      if(Object.keys(req.body).length>8){
      let data=await db.collection(collection).findOne({userEmail:userEmail},{projection:{_id:0}})
      if(data){
        res.status(200).send({message: "email already exist. Try another one",success: false})
      }else{
          data = await db.collection(collection).insertOne({
          userEmail:userEmail,
          userName: userName,
          userContact: userContact,
          businessContact: businessContact,
          businessName: businessName,
          password: password,
          country: country,
          city: city,
          address: address})
          console.log(data)
          if(data.acknowledged){
            res.status(200).send({message: "user added successfully",success: true})
          }else{
            res.status(404).send({message : "Oops, Some error occured" ,success: false});
          }
      }
    }else{
      res.status(404).send({message : "Oops, Some error occured" ,success: false});
    }
     
  }else{
      res.status(404).send({message:"databse is not connected",success: false})
  }
})

// 4. main
app.post('/credentials',async(req,res)=>{
  let db = mongoutil.getDb()
  if(db){
   const {userEmail,password}= req.body;
   if(userEmail,password){
    let data=await db.collection(collection).findOne({userEmail:userEmail},{projection:{_id:0}})
    if(data){
     if(data.password===password){
      res.status(200).send({message:"logged in successfully",success: true})
     }else{
      res.status(200).send({message:"wrong password",success: false})
     }
    }else{
      res.status(200).send({message:"Please signup first",success: false})
    }
   }else{
    res.status(404).send({message:"databse is not connected",success: false})
  }
  }else{
    res.status(404).send({message:"databse is not connected",success: false})
  }
})

 
// listening port 
 app.listen(port,  ()=>{
   console.log(`listening at port ${process.env.PORT}`)
})

