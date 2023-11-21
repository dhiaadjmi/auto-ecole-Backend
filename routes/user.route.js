const userModel = require("../models/user.model");
const express = require("express");
const route = express.Router();
require('dotenv').config()
const jwt=require('jsonwebtoken');



var privatekey =process.env.PRIVATE_KEY
verifyToken=(req,res,next) => {
  let token=req.header('authorization')
  if (!token) {
    res.status(400).json({ msg: "access rejected .......!!!!!!" });
  }
  try {
    jwt.verify(token,privatekey);
    next();
  } catch(e) {
    res.status(400).json({ msg:e });
  } 
}

route.post("/register", (req, res, next) => {
    userModel.register(
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.nom,
        req.body.prenom,
        req.body.dateNaissance,
        req.body.adresse,
        req.body.numeroTel,
        req.body.numeroCin,
        req.body.typeMoniteur,
        req.body.numPermi,
        req.body.numDiplome,
        req.body.typePermi,
        req.body.role
      )
      .then((user) => res.status(200).json({user:user,msg:"added !!"}))
      .catch((err) => res.status(400).json({error:err}));
  })
  route.post("/login", (req, res, next) => {
    userModel.login(
        req.body.email,
        req.body.password,
      )
      .then((token) => res.status(200).json({token:token}))
      .catch((err) => res.status(400).json({error:err}));
  })
  
  route.get("/",(req, res, next) => {
   // let token=req.headers.authorization
    //let user=jwt.decode(token,{complete:true})
    userModel
      .getAllUsers()
      //.then((doc) => res.status(200).json({users:doc,user:user}))
      .then((doc) => res.status(200).json(doc))
      .catch((err) => res.status(400).json(err));
  });

  route.get("/user/:id",(req, res, next) => {
    userModel
      .getOneUser(req.params.id)
      .then((doc) => res.json(doc))
      .catch((err) => res.json(err));
  });


  route.delete("/user/:id", (req, res, next) => {
    userModel
      .deleteOneUser(req.params.id)
      .then((doc) => res.json(doc))
      .catch((err) => res.json(err));
  });

  route.patch("/user/:id", (req, res, next) => {
    userModel.updateOneUser(
      req.params.id,
      req.body.username,
        req.body.email,
        req.body.password,
        req.body.nom,
        req.body.prenom,
        req.body.dateNaissance,
        req.body.adresse,
        req.body.numeroTel,
        req.body.numeroCin,
        req.body.typeMoniteur,
        req.body.numPermi,
        req.body.numDiplome,
        req.body.typePermi
       
      )
      .then((doc) => res.json(doc))
      .catch((err) => res.json(err));
  });













module.exports=route