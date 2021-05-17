import React, { useState, useRef } from "react";
import CommandList from "./CommandList";

import "./App.css";
import PlayBtn from "./Icons/PlayBtn.svg";

import io from "socket.io-client"
const socket = io.connect("http://192.168.2.169:3001", {
  transports: ["websocket"]
})

function App() {

  //Webscocket init
  const [connected, setConnected] = useState("not Connected")

  socket.on('connect', function () {
    console.log('Connected to server');
    setConnected("Connected")
  });

  socket.on('disconnect', function () {
    console.log('Disconnected');
    setConnected("Disconnected")
  });



  const commandInputRef = useRef();
  const [commands, setCommands] = useState([]);


  function onAddCommand(e) {

    if (commandInputRef.current.value == "") return

    const obj = {

      command: commandInputRef.current.value,
      date: new Date()

    }

    setCommands((prev) => {
      return [...prev, obj];
    });

    socket.emit("cmd", JSON.stringify(obj))


    commandInputRef.current.value = ""

    onAddClass("wrapper", "move");
  }

  function onAddClass(idOfElement, classN) {
    console.log("addClass function fired");

    document.getElementById(idOfElement).classList.add(classN);
  }

  return (
    <>
      <div className="wrapper first second" id="wrapper">
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
