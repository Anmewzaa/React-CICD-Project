import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [name, setName] = useState("Hello everyone ! \n My name is ...");
  const handleClick = () => {
    setName("Punyakon Patchkaew");
  };
  return (
    <>
      <h1>Hello</h1>
      <h2>{name}</h2>
      <button onClick={handleClick}>Click me !</button>
    </>
  );
}

export default App;
