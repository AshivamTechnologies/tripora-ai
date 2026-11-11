'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQS = [
  {
    question: 'Is TRIPORA AI free to use?',
    answer:
      'Yes. Creating trips, building day-by-day itineraries, and tracking estimated costs are free. Paid plans are not available yet.',
  },
  {
    question: 'How do I start a trip?',
    answer:
      'Use the planner to enter your destination, dates, travellers, travel styles, budget and preferences. Your trip is saved immediately and opens in the itinerary editor.',
  },
  {
    question: 'Can I change the plan after it is created?',
    answer:
      'Yes. Add, edit, reorder or remove activities for any day. Changes are saved as you make them.',
  },
  {
    question: 'Are prices and opening hours verified?',
    answer:
      'No. Costs and durations you enter are your own estimates. TRIPORA AI does not yet pull live fares, hotel rates or opening hours, so please confirm bookings with the provider.',
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
