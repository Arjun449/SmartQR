import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QRCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const [size, setSize] = useState(5);
  const [error, setError] = useState("");

  const navigate = useNavigate();

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

      const qrData = {
        imageUrl: response.data.imageUrl,
        url,
        timestamp: new Date().toLocaleString(),
      };

      // Save to sessionStorage
      sessionStorage.setItem("latestQR", JSON.stringify(qrData));

      // Also push to history
      const history = JSON.parse(sessionStorage.getItem("qrHistory")) || [];
      sessionStorage.setItem("qrHistory", JSON.stringify([qrData, ...history]));

      navigate("/result");
    } catch (err) {
      console.error("QR generation failed:", err);
      setError("Failed to generate QR. Try again.");
    }
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
    </div>
  );
};

export default QRCodeGenerator;
