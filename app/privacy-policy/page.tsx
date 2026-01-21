export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="text-white/70 mt-2">Last updated: {new Date().toDateString()}</p>

        <div className="mt-6 space-y-4 text-white/80 leading-relaxed">
          <p>
            LegitCheck AI (“we”, “our”, “us”) respects your privacy. This Privacy Policy explains how we
            collect and use information when you use our website.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">1. Uploaded images</h2>
          <p>
            When you upload images for authenticity checking, we process them to generate an AI-based
            assessment. We do not intentionally store your images permanently.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">2. Cookies and analytics</h2>
          <p>
            We may use cookies and analytics tools to understand website usage and improve performance.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">3. Advertising</h2>
          <p>
            We may display advertising (including Google AdSense). Ads may use cookies to show relevant
            content.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">4. Contact</h2>
          <p>
            If you have any questions, contact us at:{" "}
            <span className="text-white font-semibold">support@checkforlegit.com</span>
          </p>
        </div>
      </div>
    </main>
  );
}
