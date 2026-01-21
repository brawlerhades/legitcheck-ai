export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="text-white/70 mt-2">Last updated: {new Date().toDateString()}</p>

        <div className="mt-6 space-y-4 text-white/80 leading-relaxed">
          <p>
            By using LegitCheck AI, you agree to these Terms of Service. If you do not agree, do not use
            the website.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">1. AI results disclaimer</h2>
          <p>
            Results are AI-generated and may be incorrect. We do not guarantee authenticity decisions.
            Use results for informational purposes only.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">2. User responsibility</h2>
          <p>
            You are responsible for the images you upload and for your purchase decisions.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">3. Prohibited use</h2>
          <p>
            You may not use the website for illegal activity or to abuse the service.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">4. Contact</h2>
          <p>
            Contact: <span className="text-white font-semibold">support@checkforlegit.com</span>
          </p>
        </div>
      </div>
    </main>
  );
}
