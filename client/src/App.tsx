import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/message");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setMessage(data.message);
      console.log("data", data);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Fetch error:", error);
    }
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
