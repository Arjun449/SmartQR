import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const navigate = useNavigate();
  const data = JSON.parse(sessionStorage.getItem("latestQR"));
  const [copied, setCopied] = useState(false); // ✅ Track copied state

  if (!data) return <p className="error">No QR code data found.</p>;

  const handleDownload = () => {
    const downloadUrl = data.imageUrl.replace(
      "/upload/",
      "/upload/fl_attachment/"
    );
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "smartqr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data.imageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
    });
  };

  return (
    <div className="qr-output">
      <h2>Your QR Code:</h2>
      <img src={data.imageUrl} alt="Generated QR Code" />
      <div className="button-group">
        <button onClick={handleDownload}>Download</button>
        <button onClick={copyToClipboard}>
          {copied ? "Copied!" : "Copy URL"}
        </button>
      </div>
      <div className="button-group" style={{ marginTop: "10px" }}>
        <button onClick={() => navigate("/")}>Generate New QR</button>
      </div>

      <div className="history">
        <h3>QR Code History</h3>
        {(JSON.parse(sessionStorage.getItem("qrHistory")) || []).map(
          (item, index) => (
            <div className="history-item" key={index}>
              <img src={item.imageUrl} alt="history" className="history-img" />
              <div className="history-info">
                <p>{item.url}</p>
                <small>{item.timestamp}</small>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ResultPage;
