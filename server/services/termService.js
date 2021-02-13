/* Worker - Service Will take care of the hard work and the business logic:
    - Handle CRUD Operations
    - Fetching Data From DB 
    - Will execute and run algorithms
    - Receives the request data it needs from the manager in order to perform its tasks
    - Is generally only concerned with the tasks he/she has to complete
    - Not responsible for making decisions about the "bigger" picture orchestrating the different service calls
    - Returns the completed work a response to the manager (Controller)
*/
const termModel = require("../models/termSchema");
const { json } = require("body-parser");
const { connection } = require("mongoose");
const { query } = require("express");

const createTerm = async (req) => {
  var query = req.body.title;
  termModel.findOne({ title: query }, function (err, term) {
    if (err) console.log(err);
    if (term) console.log("This stock already been saved");
    else {
      var term = new termModel({
          name: req.body.title,
          description: req.body.description,
          urlVideo : req.body.urlVideo
      }
          
      );
      term.save(function (err, example) {
        if (err) console.log(err);
        console.log("New term created");
        return term;
      });
    }
  });
};

const updateTerm = async (req) => {
  var query = req.body.title;
  var update=req.body;
  termModel.findOneAndUpdate({title:query},update , {new: true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }

    console.log("Term updated");
});
};


const deleteTerm = async (req) => {
  var query = req.body.title;
  termModel.findOneAndDelete({title:query}, (err, doc) => {
    if (err) {
        console.log("Something wrong when deleting data!"); 
    }

    console.log("Term deleted");
});
};


const deleteTermsByLetter = async (req) => {
  var query = req.body.firstLetter;
  termModel.deleteMany({firstLetter:query},(err,doc) => {
    if (err) {
        console.log("Something wrong when deleting data!"); 
    }
    console.log("Terms deleted by letter");
});
};

const getTermByName  = async (req) => {
  var query = req.body.title;
  const term= await termModel.findOne({title:query},(err,doc) => {
    if (err) {
        console.log("Something wrong when getting data!"); 
    }
});
return term;
};

const getTermsByFirstLetter  = async (req) => {
  var query = req.body.firstLetter;
  const term= await termModel.findOne({firstLetter:query},(err,doc) => {
    if (err) {
        console.log("Something wrong when deleting data!"); 
    }
    
});
return term;
};


const getAllTerms  = async () => {
  const terms = await termModel.find({});
  return terms;
};






module.exports = {
  getAllTerms,
  getTermByName,
  getTermsByFirstLetter,
  createTerm,
  deleteTerm,
  deleteTermsByLetter,
  updateTerm
};