const mongoose = require('mongoose');
main().catch(err => console.log(err));
const mongo_url = process.env.MONGO_CONN;
async function main() {
  await mongoose.connect("mongodb://localhost:27017/Hotel-Management")
  .then(console.log("Connected to Mongo db"))
}