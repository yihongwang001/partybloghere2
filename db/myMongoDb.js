var express = require("express");
var session = require("express-session");
const MongoClient = require("mongodb").MongoClient;
const app = require("../app");
const dotenv = require("dotenv").config();
const mongoURL = process.env.MONGOLAB_URL || "mongodb://localhost:27017";
function MyDB() {
  const database = {};

  MongoClient.connect(mongoURL, { useUnifiedTopology: true }).then((client) => {
    database.getUsers = async (user) => {
      const DB = client.db("youtubePage");

      const userCollection = DB.collection("userCollection");
      // console.log(user);
      users = await DB.collection("userCollection").find(user).toArray();
      // console.log(users) ;

      return users;
    };
    database.insertUser = async (newUser) => {
      const DB = client.db("youtubePage");

      const userCollection = DB.collection("userCollection");
      userCollection.insertOne(newUser);

      console.log("user inserted", newUser);
    };
    database.insertParty = async (newParty) => {
      const DB = client.db("youtubePage");

      const userCollection = DB.collection("partyPlaces");
      userCollection.insertOne(newParty);
    };
    database.getParties = async () => {
      const DB = client.db("youtubePage");

      const userCollection = DB.collection("partyPlaces");
      // console.log(parties);
      parties = await userCollection.find().toArray();
      // console.log(parties);

      return parties;
    };
    database.addComment = async (comments) => {
      var ObjectId = require("mongodb").ObjectId;
      var id = comments[0];
      var o_id = new ObjectId(id);
      const DB = client.db("youtubePage");
      console.log(comments);
      const userCollection = DB.collection("partyPlaces");
      const query = { _id: o_id };
      const update = {
        $push: {
          commentList: {
            firstName: comments[1],
            lastName: comments[2],
            comment: comments[3],
          },
        },
      };

      userCollection.findOneAndUpdate(query, update);
      console.log(query);
    };
  });
  return database;
}
module.exports = MyDB();
