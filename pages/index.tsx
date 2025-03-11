import { useState } from "react";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShorten = async (event) => {
    event.preventDefault();
    setShowLoader(true);
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/shorten/`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Origin": window.location.origin,
        },
        body: JSON.stringify({ original_url: originalUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortUrl(data.short_url);
      } else {
        alert("Fehler beim Kürzen der URL Uppsss!");
      }
    } catch (error) {
      alert("Ein Fehler ist aufgetreten!");
    } finally {
      setLoading(false);
      setTimeout(() => setShowLoader(false), 300);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000); // Check-Icon bleibt 2 Sekunden sichtbar
  };

  return (
    <div className="nav">
      <div className="card">
        <div className="flex flex-col items-center p-10 relative">
          <h1 className="text-3xl font-bold mb-4">URL Shortener</h1>
          <form onSubmit={handleShorten} className="flex flex-col items-center">
            <input
              className="border p-2 w-96 mb-2"
              id="originalUrl"
              type="text"
              placeholder="Gib eine URL ein..."
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              URL kürzen
            </button>
          </form>

          {shortUrl && (
            <div className="mt-4 flex flex-col items-center">
              <p className="text-xl text-center">Deine Kurz-URL:</p>
              <a href={shortUrl} target="_blank" className="text-blue-600 underline">
                {shortUrl}
              </a>
              
              {/* Copy Button mit Fade-Effekt */}
              <button 
                onClick={copyToClipboard} 
                className="mt-2 flex items-center p-2 rounded transition relative"
              >
                <img 
                  src="/copy-icon-w.png" 
                  alt="Copy" 
                  className={`w-9 h-5 absolute transition-opacity duration-300 ${copied ? "opacity-0" : "opacity-100"}`} 
                />
                <img 
                  src="/check-icon-w.png" 
                  alt="Copied" 
                  className={`w-9 h-5 absolute transition-opacity duration-300 ${copied ? "opacity-100" : "opacity-0"}`} 
                />
              </button>
            </div>
          )}

          {/* Loader Overlay mit Ein-/Ausfade-Effekt */}
          {showLoader && (
            <div className={`fixed inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center text-white ${loading ? "fade-in" : "fade-out"}`}>
              <span className="loader"></span>
              <p className="mt-4 text-lg font-semibold">Bitte warten Sie...</p>
            </div>
          )}
        </div>
        <div className="footer">by peternese</div>
      </div>

      {/* Styles für Fade-Effekt */}
      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.3s ease-in-out forwards;
        }
        .fade-out {
          animation: fadeOut 0.3s ease-in-out forwards;
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
