import React, { useState } from "react";
import axios from "axios";

const QRCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a valid URL.");
      return;
    }
    try {
      console.log("Generating QR for URL:", url);
      const response = await axios.post("http://localhost:5000/api/generate", {
        url,
      });
      console.log("QR generated:", response.data);
      setQrCode(response.data.imageUrl); // Using imageUrl from backend
      setError("");
      setCopied(false);
    } catch (err) {
      console.error("QR generation failed:", err);
      setError("Failed to generate QR. Try again.");
    }
  };

  const handleDownload = () => {
    if (!qrCode) return;
    const downloadUrl = qrCode.replace("/upload/", "/upload/fl_attachment/");
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "smartqr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      {/* Form for Input & Generate Button */}
      <form onSubmit={handleGenerate} className="flex flex-col space-y-4">
        <input
          type="url"
          placeholder="Enter a URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full box-border p-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          required
        />
        <button
          type="submit"
          className="w-full p-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Generate QR Code
        </button>
      </form>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {qrCode && (
        <div className="mt-6 text-center">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
            Your QR Code:
          </h2>
          <img
            src={qrCode}
            alt="Generated QR Code"
            className="w-48 h-48 mx-auto mb-4"
          />
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={handleDownload}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Download QR Code
            </button>
            <button
              onClick={copyToClipboard}
              className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
            >
              {copied ? "Copied!" : "Copy QR URL"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
