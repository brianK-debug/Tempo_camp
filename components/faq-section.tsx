'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function FAQSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const faqs = [
    {
      q: 'What is the best time to visit Samburu?',
      a: 'The dry season from June to October offers the best wildlife viewing opportunities. However, Samburu is beautiful year-round, with each season offering unique experiences and fewer crowds during shoulder months.',
    },
    {
      q: 'What is included in the room rates?',
      a: 'Our rates include accommodation, all meals, non-alcoholic beverages, guided safaris, airport transfers, and WiFi. Premium experiences and spa treatments are available at additional cost.',
    },
    {
      q: 'Do you offer custom packages?',
      a: 'Absolutely! We specialize in tailored experiences. Contact our team with your preferences, and we&apos;ll create a bespoke itinerary for your stay.',
    },
    {
      q: 'What are your sustainability practices?',
      a: 'We operate on 100% renewable energy, practice water conservation, employ local staff, and invest 30% of profits in community development and wildlife protection programs.',
    },
    {
      q: 'Is there WiFi and mobile connectivity?',
      a: 'Yes, we have reliable WiFi throughout the camp. Mobile networks from major providers also work well in our area, though we encourage guests to embrace the digital detox experience.',
    },
    {
      q: 'What is your cancellation policy?',
      a: 'Free cancellation up to 30 days before arrival. Cancellations 15-30 days prior incur 50% charge, and within 15 days are non-refundable. Travel insurance is recommended.',
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-muted/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="luxury-heading mb-4">Frequently Asked Questions</h2>
          <p className="luxury-text text-foreground/70">
            Everything you need to know about your Samburu Tempo experience
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border border-border rounded-lg px-6 bg-card hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="py-4 text-left font-serif text-lg font-semibold text-foreground hover:text-accent transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
