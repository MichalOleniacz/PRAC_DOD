import React, { useState, useEffect } from "react";
import ChartComponent from "../../components/Chart/Chart";
import { getAllLogs } from "../../services/apiService";
import io from "socket.io-client";
import cookie from "cookie";

const App = () => {
  const [data, setData] = useState({ detailed: [], general: [] });

  useEffect(() => {
    const getData = async () => {
      getAllLogs().then((res) => {
        setData(res.data);
      });
    };
    getData();
  }, []);

  // const socket = io("ws://localhost:9000", {
  //   reconnectionDelayMax: 10000,
  //   path: "/ws",
  //   // query: {
  //   //   token: cookie.parse(document.cookie)["auth-token"],
  //   // },
  // });

  // socket.emit("newClientSession", "a");

  // socket.on("Detailed", (req) => {
  //   const dataCopy = {
  //     detailed: [...data.detailed, JSON.parse(req)],
  //     general: [...data.general],
  //   };

  //   setData(dataCopy);

  //   if (window.chart) window.chart.update();
  // });
  return <>{data && <ChartComponent data={data}></ChartComponent>}</>;
};

export default App;
