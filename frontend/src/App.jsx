import QRCodeGenerator from "./components/QRCodeGenerator";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <div className="header">
        <h1 className="title">SmartQR</h1>
        <p className="subtitle">
          Generate sleek, scannable QR codes instantly!
        </p>
      </div>
      <QRCodeGenerator />
    </div>
  );
}

export default App;
