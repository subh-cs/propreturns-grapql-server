const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const House = require("./model");
require("dotenv").config();
// allow cross-origin requests
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("error connecting to MongoDB:", err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/add", async (req, res) => {
  const house = await House.create({
    address: "33, ML Road, Chennai",
    price: 1000,
    NoOfBed: 3,
    NoOfBathTub: 2,
    NoOfToilet: 2,
  });
  res.send("User added");
});
app.get("/delete-all", async (req, res) => {
  const house = await House.deleteMany({});
  res.send("All users deleted");
});
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
