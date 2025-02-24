import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RedirectPage() {
  const router = useRouter();
  const { short } = router.query;

  useEffect(() => {
    if (short) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${short}`)
        .then((res) => {
          if (res.redirected) {
            window.location.href = res.url;
          } else {
            alert("Kurz-URL nicht gefunden!");
          }
        });
    }
  }, [short]);

  return <p>Leite weiter...</p>;
}
