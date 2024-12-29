import { useState } from "react";
import { RiLoopRightLine } from "react-icons/ri";
import "./App.css";

function App() {
  const [password, setPassword] = useState("c[1CmPR2vS!<&L!c");

  const generateRandomPassword = () => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    const charsetLength = charset.length;

    let newPassword = "";

    const randomValues = new Uint32Array(16);

    console.log({ randomValues });

    window.crypto.getRandomValues(randomValues);

    console.log({ randomValues });

    for (let i = 0; i < 16; i++) {
      const randomIndex = randomValues[i] % charsetLength;
      newPassword += charset[randomIndex];
    }

    console.log({ newPassword });
    setPassword(newPassword);
  };

  return (
    <div className="container">
      <div className="password-wrapper">
        <input value={password} readOnly />
        <button onClick={generateRandomPassword} className="regenerate-btn">
          <RiLoopRightLine />
        </button>
      </div>
      <button className="copy-btn">Copy</button>
    </div>
  );
}

export default App;
