import React, { useState } from "react";
import axios from "axios";

const QRCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [size, setSize] = useState(5);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a valid URL.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/generate", {
        url,
        size,
      });
      setQrCode(response.data.imageUrl);
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
    <div className="qr-generator">
      <form onSubmit={handleGenerate} className="form">
        <input
          type="url"
          placeholder="Enter a URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          min={1}
          max={10}
          placeholder="Size (1–10)"
        />
        <button type="submit">Generate QR Code</button>
      </form>

      {error && <p className="error">{error}</p>}

      {qrCode && (
        <div className="qr-output">
          <h2>Your QR Code:</h2>
          <img src={qrCode} alt="Generated QR Code" />
          <div className="button-group">
            <button onClick={handleDownload}>Download</button>
            <button onClick={copyToClipboard}>
              {copied ? "Copied!" : "Copy URL"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
