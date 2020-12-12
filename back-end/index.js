const express = require("express");
const app = express();
const connect = require("./dbConnection");
const { DetailedUsageInfo, validateDetailedUsageInfo } = require("./models/piDetailedInfoModel");
const { GeneralInfo, validateGeneralInfo } = require("./models/piGeneralInfoModel");
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

const SOCKET_PORT = 9001;
const EXPRESS_PORT = 9000;

app.use(express.json());
app.use(cors());
app.use("/auth", auth);
app.use("/reg", reg);

// io.use((socket, next) => {
//   const cookies = socket.handshake.headers.cookie;

//   const cookie = cookie.parse(cookies);

//   const reqJWT = cookies["auth-token"];

//   if(reqJWT)
// });

io.on("connection", async (socket) => {
  console.log("connected");
  socket.on("newClientSession", (req) => {
    socket.join("app");
  });

  socket.on("Detailed", async (req) => {
    console.log("About to emit -> ", req);
    const { error } = validateDetailedUsageInfo(req);
    if (error) return;

    socket.to("app").emit("Detailed", JSON.stringify(req));

    const Detailed = new DetailedUsageInfo(req);
    await Detailed.save();
  });
  socket.on("General", async (req) => {
    console.log("About to emit -> ", req);
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
