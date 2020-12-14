import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import io from "socket.io-client";
import { Router, Route, Switch } from "react-router-dom";
import Login from "./screens/Login/Login";
import Dashboard from "./screens/Dashboard/Dashboard";

function App() {
  return (
    <Switch>
      <Route exact path="/app" component={Dashboard} />
      <Route exact path="/" component={Login} />
    </Switch>
  );
}

export default App;
