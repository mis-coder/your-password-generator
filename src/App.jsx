import { useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("F&&jui45Ghsdujd");

  const generateRandomPassword = () => {
    
  };

  return (
    <div>
      <div className="input-wrapper">
        <input value="it is going to be strong password" readOnly />
        <button onClick={generateRandomPassword}>Re-generate</button>
        <button>Copy</button>
      </div>
    </div>
  );
}

export default App;
