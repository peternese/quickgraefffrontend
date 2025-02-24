import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function RedirectPage() {
  const router = useRouter();
  const { short } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.isReady && short) {  // ✅ Warten bis Router bereit ist!
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${short}`)
        .then((res) => {
          if (res.redirected) {
            window.location.href = res.url;
          } else {
            alert("Kurz-URL nicht gefunden!");
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error("Fehler beim Abrufen der URL:", err);
          setLoading(false);
        });
    }
  }, [router.isReady, short]);

  return (
    <div className="flex items-center justify-center h-screen">
      {loading ? <p>Leite weiter...</p> : <p>Fehler: Kurz-URL nicht gefunden!</p>}
    </div>
  );
}
