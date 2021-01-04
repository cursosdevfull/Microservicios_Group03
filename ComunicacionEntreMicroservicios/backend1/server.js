const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
const app = express();

app.use(cors());

app.get("/api/message", (req, res) => {
  const data = {
    backend1: "Este es un mensaje desde el backend1",
  };

  const apiBackend2 =
    process.env.SERVICE_API2_ENDPOINT || "http://localhost:19020/api";
  axios.get(apiBackend2 + "/message").then(
    (response) => {
      data.backend2 = response.data.backend2;
      res.json(data);
    },
    (error) => {
      console.log(error);
      res.send(error);
    }
  );
});

app.get("/api/healthz", (req, res) => {
  res.send("Estoy vivo");
});

app.get("*", (req, res) => {
  res.send("ok");
});

const port = process.env.PORT || 19010;
app.listen(port, () => console.log("Server is running on port " + port));
