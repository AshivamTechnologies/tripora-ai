'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQS = [
  {
    question: 'How do I curate and reserve an expedition?',
    answer:
      'Explore our curated sanctuaries and aviation routes, use the atelier to customize your daily pacing, and proceed to the checkout terminal to confirm your reservation via direct card, private banking wire (SWIFT), or co-traveler split settlement.',
  },
  {
    question: 'How does the 24/7 Concierge Hotline operate?',
    answer:
      'Upon reservation confirmation, you receive a direct WhatsApp hotline PIN to our Kyoto and Zurich concierge desks for restaurant bookings, bespoke transfers, and arrival amenities.',
  },
  {
    question: 'Can I split trip expenses with co-travelers?',
    answer:
      'Yes. Our collaborative split engine balances expenses down to the exact minor unit across multiple currencies and automatically dispatches individual settlement links to your co-travelers.',
  },
  {
    question: 'What membership privileges are included in Voyager Club and Private Reserve?',
    answer:
      'Members enjoy priority concierge routing, complimentary Virtuoso hotel upgrades, daily breakfast credits, private aviation charter handoffs, and off-market villa catalog access.',
  },
];

export function FaqSection() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {FAQS.map((faq, index) => (
        <AccordionItem key={faq.question} value={`faq-${index}`} className="border-brand-line">
          <AccordionTrigger className="py-5 text-left font-sans text-base font-semibold text-brand-ink hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-base leading-[1.5] text-brand-muted">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
