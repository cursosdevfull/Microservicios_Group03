const express = require("express");
const app = express();

app.use("/", express.static(__dirname + "/public"));

app.get("/api/config", (req, res) => {
  const data = {
    backend1: process.env.SERVICE_API1_ENDPOINT || "http://localhost:19010/api",
  };

  res.json(data);
});

app.get("/api/healthz", (req, res) => {
  res.send("Estoy vivo");
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const port = process.env.PORT || 19000;
app.listen(port, () => console.log("Server is running on port " + port));
