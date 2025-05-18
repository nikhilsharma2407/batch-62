import { useState } from "react";
import ClassComponent from "./ClassComponent";
import FuntionalComponent from "./FuntionalComponent";

function App() {
  const [name, setName] = useState("Nikhil")
  const [displayComponent, setDisplayComponent] = useState(true);
  const user = {
    name,
    id:101
  }

  setTimeout(() => {
    setName("GFG");
  }, 5*1000);

  return (
    <>
    {/* {displayComponent &&  <ClassComponent name={name} prop1 = "abcd" user = {user} />} */}
    {displayComponent &&  <FuntionalComponent name={name} prop1 = "abcd" user = {user} />}

    <button onClick={()=>setDisplayComponent(!displayComponent)}>{displayComponent?'Hide':'Show' } Component</button>
    </>
    
  );
}

export default App;
