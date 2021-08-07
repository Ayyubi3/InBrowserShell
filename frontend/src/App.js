import React, { useState, useRef } from "react";
import CommandList from "./CommandList";

import "./App.css";
import PlayBtn from "./Icons/PlayBtn.svg";

import io from "socket.io-client";
const socket = io.connect("http://192.168.2.169:3001", {
  transports: ["websocket"],
  upgrade: false,
});

function App() {
  //Webscocket init
  const [connected, setConnected] = useState("not Connected");

  socket.on("connect", function () {
    console.log("Connected to server");
    setConnected("Connected");
  });

  socket.on("disconnect", function () {
    console.log("Disconnected");
    socket.removeAllListeners();
    setConnected("Disconnected");
  });

  socket.on("output", function (out) {
    setCommands((prev) => {
      return [...prev, {
        command: out,
        date: new Date(),
      }];
    });

  });




  const commandInputRef = useRef();

  const [commands, setCommands] = useState([]);




  const onAddCommand = (e) => {
    if (commandInputRef.current.value === "") return;

    const obj = {
      command: commandInputRef.current.value,
      date: new Date(),
    };

    setCommands((prev) => {
      return [...prev, obj];
    });

    socket.emit("cmd", JSON.stringify(obj));

    commandInputRef.current.value = "";

    document.getElementById("wrapper").classList.add("move");
  };

  return (
    <>
      <div className="wrapper" id="wrapper">
        <input
          autoComplete="off"
          placeholder="Enter Command..."
          id="input"
          className="input noselect"
          ref={commandInputRef}
          type="text"
        />

        <button onClick={() => onAddCommand()}>
          <img src={PlayBtn} alt="Play" className="noselect" />
        </button>
      </div>

      <h1 className="con">{connected}</h1>

      <CommandList commandlist={commands} />
    </>
  );
}

export default App;
