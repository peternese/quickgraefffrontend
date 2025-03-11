import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RedirectPage() {
  const router = useRouter();
  const { short } = router.query;

  useEffect(() => {
    if (router.isReady && short) {
      const redirectUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${short}`;
      console.log("🚀 Redirecting to:", redirectUrl);
      window.location.href = redirectUrl; // ✅ Direkt weiterleiten
    }
  }, [router.isReady, short]);

  return <p>Leitende weiter...</p>;
}
