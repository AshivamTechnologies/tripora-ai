export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-mist pb-24 pt-12">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <h1 className="font-serif text-4xl text-brand-ink">Privacy Policy</h1>
        <p className="mt-2 text-xs text-brand-muted uppercase tracking-wider">Effective: November 2026 &bull; GDPR & CCPA Compliant</p>

        <div className="mt-8 space-y-6 rounded-3xl border border-brand-line bg-white p-8 sm:p-12 text-sm leading-relaxed text-brand-muted">
          <div>
            <h2 className="font-serif text-xl text-brand-ink">1. Data Minimization & Privacy Philosophy</h2>
            <p className="mt-2">
              TRIPORA AI collects only the minimal information required to generate your personalized travel itineraries and manage your collaborative expenses. We do not sell your personal data to advertisers or commercial data brokers.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-brand-ink">2. Information We Collect</h2>
            <p className="mt-2">
              We collect your account email, display name, travel preferences (pace, dietary requirements, preferred currencies), and trip parameters (dates, origin, destination). Payment card details are processed directly through PCI-DSS Level 1 compliant gateway providers and are never stored on our application servers.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-brand-ink">3. Concierge &amp; Atelier Privacy</h2>
            <p className="mt-2">
              When querying spatial routing and recommendation services, we sanitize user prompts to exclude sensitive personally identifiable information. Your conversations are utilized solely for active trip planning responses.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-brand-ink">4. Data Export & Right to Deletion</h2>
            <p className="mt-2">
              You maintain the absolute right to export your complete trip history in open JSON format or permanently delete your account and associated trip records at any time through your User Profile Settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
