export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-mist pb-24 pt-12">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <h1 className="font-serif text-4xl text-brand-ink">Terms and Conditions</h1>
        <p className="mt-2 text-xs text-brand-muted uppercase tracking-wider">Effective: November 2026</p>

        <div className="mt-8 space-y-6 rounded-3xl border border-brand-line bg-white p-8 sm:p-12 text-sm leading-relaxed text-brand-muted">
          <div>
            <h2 className="font-serif text-xl text-brand-ink">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By accessing and using TRIPORA AI (the &quot;Platform&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-brand-ink">2. Curated Recommendations &amp; Itineraries</h2>
            <p className="mt-2">
              The platform utilizes advanced spatial curation models to synthesize travel itineraries, packing checklists, and budget allocations. While we optimize for maximum geographic and temporal accuracy, actual venue hours, ticket prices, visa requirements, and transit conditions are subject to change. Travelers are advised to confirm critical details with direct service operators.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-brand-ink">3. Third-Party Booking Handoffs</h2>
            <p className="mt-2">
              TRIPORA AI facilitates transparent price discovery and reservation links to verified airlines, hotel aggregators, and railway operators. TRIPORA AI does not issue airline tickets directly and is not responsible for cancellations or fare modifications made by external carriers.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-brand-ink">4. User Accounts & Group Collaboration</h2>
            <p className="mt-2">
              You are responsible for maintaining the confidentiality of your account credentials. You retain full ownership of custom trip notes and user-uploaded media. Co-travelers invited to journeys must adhere to standard community guidelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
