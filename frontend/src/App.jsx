import QRCodeGenerator from "./components/QRCodeGenerator";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">SmartQR</h1>
        <p className="text-lg mb-6">
          Generate sleek, scannable QR codes instantly!
        </p>
        <QRCodeGenerator />
      </div>
    </div>
  );
}

export default App;
