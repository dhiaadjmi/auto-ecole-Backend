const mongoose = require("mongoose");
const Joi = require("joi");
require("dotenv").config();

var schemaQuestion = mongoose.Schema({
    quizid: {
        type: String,
        required: true
    },
    questionId: {
        type: String,
        required: true
    },
    questionText:{
        type: String, 
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    options:{
        type  :Array,
        default:[]
    }
})

var Question = mongoose.model("question", schemaQuestion);

url =process.env.URL

exports.testConnect = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        mongoose.disconnect();
        resolve("connected ");
      })
      .catch((err) => reject(err));
  });
};




exports.addNewQuestion = (quizid,questionId, questionText, answer,options) => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {

          let question = new Question({
            quizid: quizid,
            questionId:questionId,
            questionText: questionText,
            answer: answer,
            options:options

          });
          question.save()
            .then((doc) => {
              mongoose.disconnect();
              resolve(doc);
            })
            .catch((err) => {
              mongoose.disconnect();
              reject(err);
            });
        })
        .catch((err) => reject(err));
    });
  };




