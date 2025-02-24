import { useState } from "react";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/shorten/`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Origin": window.location.origin  // ✅ WICHTIG!
      },
      body: JSON.stringify({ original_url: originalUrl }),
    });

    if (response.ok) {
      const data = await response.json();
      setShortUrl(data.short_url);
    } else {
      alert("Fehler beim Kürzen der URL Uppsss!");
    }
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-4">URL Shortener</h1>
      <input
        className="border p-2 w-96 mb-2"
        type="text"
        placeholder="Gib eine URL ein..."
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 rounded" onClick={handleShorten}>
        URL kürzen
      </button>

      {shortUrl && (
        <div className="mt-4">
          <p className="text-xl">Deine Kurz-URL:</p>
          <a href={shortUrl} target="_blank" className="text-blue-600 underline">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}
