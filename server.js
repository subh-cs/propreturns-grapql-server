const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const House = require("./model");
require("dotenv").config();

const MONGO_URI = "mongodb+srv://admin:admin123@cluster0.qlms6sd.mongodb.net/?retryWrites=true&w=majority" || process.env.MONGO_URI
const PORT = 3000 || process.env.PORT

// allow cross-origin requests
app.use(cors());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("error connecting to MongoDB:", err));

app.get("/", (req, res) => {
  res.json({message:"Hello World!"})
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
