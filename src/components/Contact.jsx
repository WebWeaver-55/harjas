import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Home,
} from "lucide-react";

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    hostelPreference: "",
    roomType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      id="contact"
      className="section-padding bg-teal-primary relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Home size={24} className="text-gold" />
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
              Schedule a Free Visit Today
            </h3>
          </div>
          <p className="text-white/60 mb-6 max-w-lg mx-auto">
            Come see the hostel in person — no commitment needed. We&apos;d love
            to show you around!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => scrollToSection("contact-form")}
              className="btn-primary"
            >
              Book a Visit
            </button>
            <a href="tel:+91XXXXXXXXXX" className="btn-outline">
              <Phone size={16} />
              Call Us Now
            </a>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Ready to make Harjas Hostel your home? Reach out and we&apos;ll get
            back to you within hours.
          </p>
        </motion.div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Form */}
          <motion.div
            id="contact-form"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-white/70 text-sm mb-2 font-medium"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-gold/50 focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-white/70 text-sm mb-2 font-medium"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-gold/50 focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all duration-300"
                    placeholder="XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-white/70 text-sm mb-2 font-medium"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-gold/50 focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="hostelPreference"
                    className="block text-white/70 text-sm mb-2 font-medium"
                  >
                    Hostel Preference
                  </label>
                  <select
                    id="hostelPreference"
                    name="hostelPreference"
                    value={formData.hostelPreference}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold/50 focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-teal-primary">
                      Select
                    </option>
                    <option value="boys" className="bg-teal-primary">
                      Boys Hostel
                    </option>
                    <option value="girls" className="bg-teal-primary">
                      Girls Hostel
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="roomType"
                    className="block text-white/70 text-sm mb-2 font-medium"
                  >
                    Room Type
                  </label>
                  <select
                    id="roomType"
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold/50 focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-teal-primary">
                      Select
                    </option>
                    <option value="single" className="bg-teal-primary">
                      Single Occupancy
                    </option>
                    <option value="twin" className="bg-teal-primary">
                      Twin Sharing
                    </option>
                    <option value="triple" className="bg-teal-primary">
                      Triple Sharing
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-white/70 text-sm mb-2 font-medium"
                >
                  Message <span className="text-white/30">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-gold/50 focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Any specific requirements or questions?"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full btn-primary justify-center text-base py-4 ${submitted ? "bg-green-500 hover:bg-green-500" : ""}`}
                disabled={submitted}
              >
                {submitted ? (
                  <>✓ Request Sent Successfully!</>
                ) : (
                  <>
                    <Send size={18} />
                    Request a Callback
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Right: Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  title: "Address",
                  text: "Harjas Hostel, Near UPES Campus,\nBidholi, Dehradun, Uttarakhand — 248007",
                },
                { icon: Phone, title: "Phone", text: "+91 XXXXX XXXXX" },
                { icon: Mail, title: "Email", text: "info@harjashostel.com" },
                {
                  icon: Clock,
                  title: "Visiting Hours",
                  text: "10 AM – 7 PM (Mon–Sat)",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">{title}</p>
                    <p className="text-white/50 text-sm leading-relaxed whitespace-pre-line">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/+917983366239?text=Hi, I'm interested in Harjas Hostel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold transition-all duration-300"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>

            <div className="rounded-xl overflow-hidden border border-white/10 h-64 lg:h-72">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3440.9476577333844!2d77.96671487606605!3d30.40922690119453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d50074e307a7%3A0x81c37a8a92598e7f!2sHarjas%20Girls%20Hostel%20Dehradun!5e0!3m2!1sen!2sin!4v1779731601843!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Harjas Hostel Location Map"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
