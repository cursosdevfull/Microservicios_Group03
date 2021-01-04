const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/api/message", (req, res) => {
  const data = {
    backend2: "Este es un mensaje desde el backend2",
  };

  res.json(data);
});

app.get("/api/healthz", (req, res) => {
  res.send("Estoy vivo");
});

app.get("*", (req, res) => {
  res.send("ok");
});

const port = process.env.PORT || 19020;
app.listen(port, () => console.log("Server is running on port " + port));
