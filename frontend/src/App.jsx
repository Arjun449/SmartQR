import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QRCodeGenerator from "./components/QRCodeGenerator";
import ResultPage from "./components/ResultPage";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="header">
          <h1 className="title">SmartQR</h1>
          <p className="subtitle">
            Generate sleek, scannable QR codes instantly!
          </p>
        </div>
        <Routes>
          <Route path="/" element={<QRCodeGenerator />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
