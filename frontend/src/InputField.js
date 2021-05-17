import React from "react";
import PlayBtn from "./Icons/PlayBtn.svg";

export default function InputField(commandInputRef, setCommands, socket) {
  const onAddCommand = (e) => {
    if (commandInputRef.value === "") return;

    const obj = {
      command: commandInputRef.value,
      date: new Date(),
      result: null,
    };

    setCommands((prev) => {
      return [...prev, obj];
    });

    socket.emit("cmd", JSON.stringify(obj));

    commandInputRef.value = "";

    document.getElementById("wrapper").classList.add("move");
  };

  return (
    <div className="wrapper" id="wrapper">
      <input
        autoComplete="off"
        placeholder="Enter Command..."
        id="input"
        className="input noselect"
        type="text"
      />

      <button onClick={() => onAddCommand()}>
        <img src={PlayBtn} alt="Play" className="noselect" />
      </button>
    </div>
  );
}
