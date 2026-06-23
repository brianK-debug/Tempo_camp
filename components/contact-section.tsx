'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: 'Message sent successfully!',
          description: "We'll get back to you shortly.",
          variant: 'default',
        })
        setFormState({ name: '', email: '', subject: '', message: '' })
      } else {
        toast({
          title: 'Failed to send message',
          description: data.error || 'Please try again later.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: 'Error sending message',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+254 712 875 127',
      link: 'tel:+254712875127',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'samburutempocamp@gmail.com',
      link: 'mailto:samburutempocamp@gmail.com',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: "Archer's Post, Near Samburu National Reserve, Kenya",
      link: '#',
    },
  ]

  return (
    <section id="contact" ref={ref} className="py-24 md:py-40 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-secondary text-sm font-light tracking-widest uppercase mb-4">Get In Touch</p>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
            Plan Your Journey
          </h2>
          <p className="text-lg md:text-xl text-foreground/75 max-w-3xl mx-auto font-light">
            Our team is ready to craft your perfect Samburu experience. Reach out to us through any channel that works best for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {contactInfo.map((info, idx) => {
              const Icon = info.icon
              return (
                <div key={idx} className="group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-semibold text-foreground mb-3">{info.label}</h3>
                      {'value' in info && (
                        <a
                          href={info.link}
                          className="text-lg text-foreground/80 hover:text-secondary transition-colors font-light"
                        >
                          {info.value}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-white p-8 md:p-12 border border-border"
          >
            <h3 className="text-2xl font-serif font-bold text-foreground mb-8">Send Us a Message</h3>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formState.subject}
                  onChange={(e) =>
                    setFormState({ ...formState, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                  placeholder="Booking inquiry, question, etc."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Message
                </label>
                <textarea
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary transition-all h-40 resize-none"
                  placeholder="Tell us about your dream Samburu experience..."
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-6 py-4 bg-secondary text-foreground rounded-lg hover:bg-secondary/90 transition-colors font-semibold uppercase tracking-wide"
              >
                Send Inquiry
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
