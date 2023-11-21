const quizzModel = require("../models/quizz.model");
const express = require("express");
const route = express.Router();
const jwt=require('jsonwebtoken');
require('dotenv').config()


route.get("/", (req, res, next) => {
    quizzModel
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
  route.post("/addquizz", (req, res, next) => {
    quizzModel.addNewQuizz(
        req.body.quizname,
        req.body.quizdescription,
        req.body.upload,
        req.body.owner,
      )
      .then((doc) => res.status(200).json(doc))
      .catch((err) => res.status(400).json(err));
  });


  route.get("/quizzes", (req, res, next) => {
   
    quizzModel
      .getAllQuizz()
      .then((doc) => res.status(200).json({quizzes:doc}))
      .catch((err) => res.status(400).json(err));
  });
  route.get("/:id", (req, res, next) => {
    quizzModel
      .getOneQuizz(req.params.id)
      .then((doc) => res.json(doc))
      .catch((err) => res.json(err));
  });



  route.delete("/:id", (req, res, next) => {
    quizzModel
      .deleteOneQuizz(req.params.id)
      .then((doc) => res.json(doc))
      .catch((err) => res.json(err));
  });

  module.exports=route