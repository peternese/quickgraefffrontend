import { useState, useEffect } from "react";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false); // Steuert Fade-Out Effekt

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
      setTimeout(() => setShowLoader(false), 300); // 300ms Verzögerung für Fade-Out
    }
  };

  return (
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
        <div className="mt-4">
          <p className="text-xl">Deine Kurz-URL:</p>
          <a href={shortUrl} target="_blank" className="text-blue-600 underline">
            {shortUrl}
          </a>
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
  );
}
