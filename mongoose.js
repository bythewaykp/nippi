let mongoose = require("mongoose");

const db = mongoose.connection;
mongoose.set("strictQuery", true);

// const URI = "mongodb+srv://kphere:KPmongoDB@nippi.ezvsgxc.mongodb.net/test"
// const config = { useNewUrlParser: true, useUnifiedTopology: true };
// mongoose.connect(URI, config);

db.on("open", () => {
  console.log("\n--- Connected to DataBase ---\n");
})
  .on("error", (err) => {
    console.log("dberror");
    // console.log(err);
  })
  .on("close", () => {
    console.log(`You are no longer connected to Mongo`);
  });

module.exports = mongoose;
