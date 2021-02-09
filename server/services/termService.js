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
const fetch = require("node-fetch");
const { json } = require("body-parser");
const { connection } = require("mongoose");


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

const get = (req, res) =>{
    termModel.findOne({ title: query }) /*needd to fucking donee*/
}




module.exports = {
  getAllStocks,
  getStockDataByName,
  getTodayStockRateByName,
  createStock,
  addCommentToStock,
  getStockComments,
  getHistoricalStockRateByName,
};
