import { useState } from "react";
import { RiLoopRightLine } from "react-icons/ri";
import "./App.css";

function App() {
  const [password, setPassword] = useState("c[1CmPR2vS!<&L!c");
  const [settings, setSettings] = useState({
    length: 12,
    useCapitals: true,
    useDigits: false,
    useSymbols: true,
  });

  const [copyText, setCopyText] = useState("copy");
  const [passwordStrength, setPasswordStrength] = useState("");

  const generateRandomPassword = (options) => {
    const { length, useCapitals, useDigits, useSymbols } = options;

    let charset = "abcdefghijklmnopqrstuvwxyz";

    if (useCapitals) {
      charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (useDigits) {
      charset += "0123456789";
    }

    if (useSymbols) {
      charset += "!@#$%^&*()_+[]{}|;:,.<>?";
    }

    const charsetLength = charset.length;

    let newPassword = "";

    const randomValues = new Uint32Array(length);

    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
      const randomIndex = randomValues[i] % charsetLength;
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
    if (
      settings.length >= 12 &&
      settings.useCapitals &&
      settings.useDigits &&
      settings.useSymbols
    ) {
      setPasswordStrength("Very Strong Password!");
    } else if (
      settings.length >= 12 &&
      [settings.useCapitals, settings.useDigits, settings.useSymbols].includes(
        true
      )
    ) {
      setPasswordStrength("Strong Password!");
    } else {
      setPasswordStrength("Weak Password!");
    }
  };

  const onLengthChange = (e) => {
    setSettings({
      ...settings,
      length: e.target.value,
    });
  };

  const onCapitalSettingChange = (e) => {
    setSettings({
      ...settings,
      useCapitals: e.target.checked,
    });
  };

  const onDigitSettingChange = (e) => {
    setSettings({
      ...settings,
      useDigits: e.target.checked,
    });
  };

  const onSymbolSettingChange = (e) => {
    setSettings({
      ...settings,
      useSymbols: e.target.checked,
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(password);
    setCopyText("copied!");

    setTimeout(() => {
      setCopyText("copy");
    }, 1000);
  };

  return (
    <div className="container">
      <span className="password-strength">{passwordStrength}</span>
      <div className="password-wrapper">
        <input value={password} readOnly />
        <button
          onClick={() => generateRandomPassword(settings)}
          className="regenerate-btn"
        >
          <RiLoopRightLine />
        </button>
      </div>
      <button className="copy-btn" onClick={onCopy}>
        {copyText}
      </button>
      <div className="settings">
        <div className="length">
          <div className="length-label">
            <span>Length</span>
            <span>{settings.length}</span>
          </div>
          <input
            value={settings.length}
            onChange={onLengthChange}
            type="range"
            min={1}
            max={30}
          />
        </div>
        <div className="capitals">
          <span>Use Capital Letters</span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              defaultChecked={settings.useCapitals}
              value={settings.useCapitals}
              onChange={onCapitalSettingChange}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="digits">
          <span>Use Digits</span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              defaultChecked={settings.useDigits}
              value={settings.useDigits}
              onChange={onDigitSettingChange}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="symbols">
          <span>Use Symbols</span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              defaultChecked={settings.useSymbols}
              value={settings.useSymbols}
              onChange={onSymbolSettingChange}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
