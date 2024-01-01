import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    const response = await fetch("http://localhost:5000/message");
    const data = await response.json();
    setMessage(data.message);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleClick}>Click me</button>
        <p>{message}</p>
      </header>
    </div>
  );
};

export default App;
