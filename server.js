const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors')
const userRoute = require ('./routes/user.route')
const vehiculeRoute = require ('./routes/vehicule.route')
const seanceRoute=require('./routes/seance.route')

const quizzRoute = require ('./routes/quizz.route')
const questionRoute = require ('./routes/question.route')
const app = express();


app.use(cors())


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
/** 
app.use((req,res,next)=>{
  res.setHeader('Access-Allow-Origin',"*")
  res.setHeader('Acess-Control-Request-Method',"*")
  res.setHeader('Access-Control-Allow-Headers ',"*")
  next()
})
 */ 


app.use("/users", userRoute);

app.use("/vehicules", vehiculeRoute);

app.use("/seances", seanceRoute);


app.use("/questions", questionRoute);


app.use("/quizzs", quizzRoute);

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`le serveur est sur l'adresse suivante http://localhost:${port}`);
});

