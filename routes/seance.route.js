const seanceModel = require("../models/seance.model");
const express = require("express");
const route = express.Router();
const jwt=require('jsonwebtoken');
require('dotenv').config()


route.get("/", (req, res, next) => {
    seanceModel
      .testConnect()
      .then((msg) => res.send(msg))
      .catch((err) => res.send(err));
  });
  //var privatekey = "this is my secret key diehdijdojaiddienddizdzdnzd"
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

  route.post("/addseance", (req, res, next) => {
    seanceModel
      .addNewSeance(
        req.body.dateSeance,
        req.body.duree,
        req.body.type,
        req.body.user,
      )
      .then((doc) => res.status(200).json(doc))
      .catch((err) => res.status(400).json(err));
  });


  route.get("/seances", verifyToken,(req, res, next) => {
    let token=req.headers.authorization
    let user=jwt.decode(token,{complete:true})
    seanceModel
      .getAllSeances()
      .then((doc) => res.status(200).json({seances:doc,user:user}))
      .catch((err) => res.status(400).json(err));
  });

  route.get("/seance/:id",verifyToken, (req, res, next) => {
    seanceModel
      .getOneSeance(req.params.id)
      .then((doc) => res.json(doc))
      .catch((err) => res.json(err));
  });



  route.delete("/seance/:id",verifyToken, (req, res, next) => {
    seanceModel
      .deleteOneSeance(req.params.id)
      .then((doc) => res.json(doc))
      .catch((err) => res.json(err));
  });
  
  route.patch("/seance/:id",verifyToken,(req, res, next) => {
    seanceModel.updateOneSeance(req.params.id,req.body.dateSeance,req.body.duree,req.body.type,req.body.user)
      .then((doc) => res.status(200).json(doc))
      .catch((err) => res.status(200).json(err));
  })

  module.exports = route;