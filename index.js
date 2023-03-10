const express = require("express");
const { tokenValidation } = require("./src/middlewares/authValidator");
const contentRouter = require("./src/routers/content");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:4000",
      "http://localhost:3001",
    ],
  })
);

app.use(express.json());
app.use("/content", tokenValidation, contentRouter);

const hostname = "127.0.0.1";
const port = 3001;

app.listen(port, () => {
  console.log(`http://${hostname}:${port}`);
});
