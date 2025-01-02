import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCopy, IoCopyOutline } from "react-icons/io5";
import { RiLoopRightLine } from "react-icons/ri";
import PasswordLength from "../settings/PasswordLength";
import ToggleSetting from "../settings/ToggleSetting";
import Button from "../ui/button";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [settings, setSettings] = useState({
    length: 12,
    useCapitals: true,
    useDigits: false,
    useSymbols: true,
  });

  const [copyText, setCopyText] = useState("copy");
  const [passwordStrength, setPasswordStrength] = useState("");

  useEffect(() => {
    generateRandomPassword(settings);
  }, []);

  const calculateStrength = (settings) => {
    if (
      settings.length >= 12 &&
      settings.useCapitals &&
      settings.useDigits &&
      settings.useSymbols
    ) {
      return "Very Strong Password!";
    }
    if (
      settings.length >= 12 &&
      [settings.useCapitals, settings.useDigits, settings.useSymbols].includes(
        true
      )
    ) {
      return "Strong Password!";
    }
    return "Weak Password!";
  };

  const generateRandomPassword = useCallback(() => {
    const { length, useCapitals, useDigits, useSymbols } = settings;
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (useCapitals) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useDigits) charset += "0123456789";
    if (useSymbols) charset += "!@#$%^&*()_+[]{}|;:,.<>?";

    const newPassword = Array.from(
      window.crypto.getRandomValues(new Uint32Array(length)),
      (val) => charset[val % charset.length]
    ).join("");

    setPassword(newPassword);
    setPasswordStrength(calculateStrength(settings));
  }, [settings]);

  const updateSettings = (key, value) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const onCopy = () => {
    navigator.clipboard.writeText(password);
    setCopyText("copied!");
    toast.success("Password copied to clipboard!");

    setTimeout(() => {
      setCopyText("copy");
    }, 1000);
  };

  return (
    <div className="container">
      <span className="password-strength">{passwordStrength}</span>
      <div className="password-wrapper">
        <input value={password} readOnly />
        <Button className="copy-btn" onClick={onCopy}>
          {copyText === "copy" ? <IoCopyOutline /> : <IoCopy />}
        </Button>
      </div>

      <div className="settings">
        <PasswordLength
          value={settings.length}
          onChange={(e) => updateSettings("length", e.target.value)}
        />
        <ToggleSetting
          className="capitals"
          name="Use Capital Letters"
          value={settings.useCapitals}
          defaultChecked={settings.useCapitals}
          onChange={(e) => updateSettings("useCapitals", e.target.checked)}
        />
        <ToggleSetting
          className="digits"
          name="Use Digits"
          value={settings.useDigits}
          defaultChecked={settings.useDigits}
          onChange={(e) => updateSettings("useDigits", e.target.checked)}
        />
        <ToggleSetting
          className="symbols"
          name="Use Symbols"
          value={settings.useSymbols}
          defaultChecked={settings.useSymbols}
          onChange={(e) => updateSettings("useSymbols", e.target.checked)}
        />
      </div>
      <Button
        onClick={() => generateRandomPassword(settings)}
        className="regenerate-btn"
      >
        <RiLoopRightLine /> &nbsp; Generate
      </Button>
    </div>
  );
};

export default PasswordGenerator;
