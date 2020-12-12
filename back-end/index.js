const express = require("express");
const app = express();
const connect = require("./dbConnection");
const { DetailedUsageInfo, validateDetailedUsageInfo } = require("../models/piDetailedInfoModel");
const { GeneralInfo, validateGeneralInfo } = require("../models/piGeneralInfoModel");
const websocketAuth = require("./middleware/websocketAuth");
const cors = require("cors");
const http = require("http").createServer(app);
const io = require("socket.io")(9001, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
require("dotenv").config();

const auth = require("./routes/auth");
const reg = require("./routes/register");
const logs = require("./routes/logs");

const SOCKET_PORT = 9001;
const EXPRESS_PORT = 9000;

app.use(express.json());
app.use(cors());
app.use("/auth", auth);
app.use("/reg", reg);
app.use("/logs", logs);

io.use(websocketAuth);

io.on("connection", async (socket) => {
  console.log("connected");
  socket.on("newClientSession", async (req) => {
    socket.join("app");
  });

  socket.on("Detailed", (req) => {
  const { error } = validateDetailedUsageInfo(req);
  if (error) return;

  socket.to("app").emit("Detailed", JSON.stringify(req));

  const Detailed = new DetailedUsageInfo(req);
  await Detailed.save();
});
  socket.on("General", (req) => {
  const { error } = validateGeneralInfo(req);
  if (error) return;

  socket.to("app").emit("General", JSON.stringify(req));

  const General = new GeneralInfo(req);
  await General.save();
});
  socket.on("disconnect", () => {
    socket.leave("app");
  });
});

http.listen(EXPRESS_PORT, () => console.log(`Listening on PORT ${EXPRESS_PORT}`));
