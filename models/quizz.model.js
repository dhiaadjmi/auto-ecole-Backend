const mongoose = require("mongoose");
const Joi = require("joi");
require("dotenv").config();

let schemaQuizz = mongoose.Schema({
 
  quizname:String,
  quizdescription:String,
  upload:Boolean,
  owner:String,
});

var Quizz = mongoose.model("quizz", schemaQuizz);

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




exports.addNewQuizz = (quizname,quizdescription, upload, owner) => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {

          let quizz = new Quizz({
            quizname: quizname,
            quizdescription:quizdescription,
            upload: upload,
            owner: owner

          });
          quizz.save()
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

  exports.getAllQuizz = () => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          return Quizz.find();
        })
        .then((doc) => {
          mongoose.disconnect();
          resolve(doc);
        })
        .catch((err) => {
          mongoose.disconnect();
          reject(err);
        });
    });
  };

  exports.getOneQuizz = (id) => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          return Quizz.findById(id);
        })
        .then((doc) => {
          mongoose.disconnect();
          resolve(doc);
        })
        .catch((err) => {
          mongoose.disconnect();
          reject(err);
        });
    });
  }


  exports.deleteOneQuizz = (id) => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          return Quizz.deleteOne({_id:id});
        })
        .then((doc) => {
          mongoose.disconnect();
          resolve(doc);
        })
        .catch((err) => {
          mongoose.disconnect();
          reject(err);
        });
    });
  }



