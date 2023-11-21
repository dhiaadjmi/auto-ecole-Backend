const questionModel = require("../models/question.model");
const express = require("express");
const route = express.Router();
const jwt=require('jsonwebtoken');
require('dotenv').config()


route.get("/", (req, res, next) => {
  questionModel
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

        
  route.post("/addquestion", (req, res, next) => {
    questionModel
      .addNewQuestion(
        req.body.quizid,
        req.body.questionId,
        req.body.questionText,
        req.body.answer,
        req.body.options,
      )
      .then((doc) => res.status(200).json(doc))
      .catch((err) => res.status(400).json(err));
  });



  module.exports = route;