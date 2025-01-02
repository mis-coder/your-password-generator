import { Toaster } from "react-hot-toast";

import PasswordGenerator from "./components/password-generator";

import "./App.css";

function App() {
  return (
    <>
      <Toaster />
      <PasswordGenerator />
    </>
  );
}

export default App;
