import { Toaster } from "react-hot-toast";

import PasswordGenerator from "./components/password-generator";

import "./App.css";
import Footer from "./components/layout/footer";

function App() {
  return (
    <>
      <Toaster />
      <PasswordGenerator />
      <Footer />
    </>
  );
}

export default App;
