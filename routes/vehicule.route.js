const vehiculeModel = require("../models/vehicule.model");
const express = require("express");
const route = express.Router();
const jwt=require('jsonwebtoken');
require('dotenv').config()

route.get("/", (req, res, next) => {
    vehiculeModel
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
  
  route.post("/addvehicule", (req, res, next) => {
    vehiculeModel
      .addNewVehicule(
        req.body.matricule,
        req.body.marque,
        req.body.modele,
        req.body.numeroSerie,
        req.body.dateAssurance,
        req.body.dateFinAssurance,
        req.body.dateCtrlTechnique,
        req.body.dateProchainCtrlTechnique
      )
      .then((doc) => res.status(200).json(doc))
      .catch((err) => res.status(400).json(err));
  });



 // route.get("/vehicules", verifyToken,(req, res, next) => {
   route.get("/vehicules",(req, res, next) => {
    let token=req.headers.authorization
    let user=jwt.decode(token,{complete:true})
    vehiculeModel
      .getAllVehicules()
      .then((doc) => res.status(200).json({vehicules:doc,user:user}))
      .catch((err) => res.status(400).json(err));
  });




  route.get("/vehicule/:id", (req, res, next) => {
    vehiculeModel
      .getOneVehicule(req.params.id)
      .then((doc) => res.json(doc))
      .catch((err) => res.json(err));
  });



  route.delete("/vehicule/:id", (req, res, next) => {
    vehiculeModel
      .deleteOneVehicule(req.params.id)
      .then((doc) => res.json(doc))
      .catch((err) => res.json(err));
  });






  route.patch("/vehicule/:id",(req, res, next) => {
    vehiculeModel.updateOneVehicule(req.params.id,req.body.matricule,req.body.marque,req.body.modele,req.body.numeroSerie,req.body.dateAssurance,req.body.dateFinAssurance,req.body.dateCtrlTechnique,req.body.dateProchainCtrlTechnique
      )
      .then((doc) => res.status(200).json(doc))
      .catch((err) => res.status(200).json(err));
  })

  module.exports = route;
