const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./routes"));

// cookies and sessions requirements
const session = require("express-session");
const Store = require("express-session").Store;
const MongooseStore = require("mongoose-express-session")(Store);

const sess = {
  // this object gives the params for cookies
  secret: "Super Secret Secret", // this should be stored in .env
  cookie: {}, // to use cookies, declare "cookies: {},"
  resave: false,
  rolling: false,
  saveUninitialized: true,
  store: new MongooseStore({
    connection: mongoose,
  }),
};

app.use(session(sess));

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/rpg-game", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("debug", true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT} 🌍`));
