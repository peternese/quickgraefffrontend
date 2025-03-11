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

  return <div className={`fixed inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center text-white`}>
  <span className="loader"></span>
  <p className="mt-4 text-lg font-semibold">Bitte warten Sie...</p>
  <p className="powered">brought to you by peternese</p>
</div>;
}
