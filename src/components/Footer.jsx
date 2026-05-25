import { MessageCircle } from 'lucide-react';

const InstagramIcon = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <path d="m10 15 5-3-5-3z"/>
  </svg>
);

function scrollToSection(id) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, 50);
}

const quickLinks = [
  { name: 'Home', id: 'home' },
  { name: 'Rooms', id: 'rooms' },
  { name: 'Amenities', id: 'amenities' },
  { name: 'Gallery', id: 'gallery' },
  { name: 'Locations', id: 'locations' },
  { name: 'Reviews', id: 'reviews' },
  { name: 'Contact', id: 'contact' },
];

const roomLinks = [
  { name: 'Boys Hostel', id: 'rooms' },
  { name: 'Girls Hostel', id: 'rooms' },
  { name: 'Single Room', id: 'rooms' },
  { name: 'Twin Sharing', id: 'rooms' },
  { name: 'Triple Sharing', id: 'rooms' },
];

const socialLinks = [
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: FacebookIcon, href: '#', label: 'Facebook' },
  { icon: YoutubeIcon, href: '#', label: 'YouTube' },
  { icon: MessageCircle, href: 'https://wa.me/91XXXXXXXXXX', label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer className="bg-teal-dark pt-14 pb-0">
      <div className="container-custom">

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img
              src="/images/harjas-logo.png"
              alt="Harjas Hostel"
              className="h-12 w-auto mb-4"
            />
            <p className="text-white/40 text-sm leading-relaxed max-w-[220px]">
              Your home away from home, near UPES Dehradun. Premium student living with world-class amenities.
            </p>
            <p className="text-gold text-xs mt-4 font-medium tracking-widest uppercase">
              Your Space. Your Pace.
            </p>

            {/* Social icons — shown here on desktop */}
            <div className="hidden md:flex items-center gap-2.5 mt-6">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 hover:bg-gold/10 transition-all duration-300"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs tracking-widest uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-white/40 hover:text-gold text-sm transition-colors duration-300 text-left w-full"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Rooms */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs tracking-widest uppercase">
              Rooms
            </h4>
            <ul className="space-y-3">
              {roomLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-white/40 hover:text-gold text-sm transition-colors duration-300 text-left w-full"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs tracking-widest uppercase">
              Contact
            </h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5">
                <span className="text-base leading-none mt-0.5">📞</span>
                <span className="text-white/40 text-sm">+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-base leading-none mt-0.5">📧</span>
                <span className="text-white/40 text-sm break-all">info@harjashostel.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-base leading-none mt-0.5">📍</span>
                <span className="text-white/40 text-sm leading-relaxed">
                  Near UPES Campus,<br />Bidholi, Dehradun — 248007
                </span>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/91XXXXXXXXXX?text=Hi, I'm interested in Harjas Hostel"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] text-sm font-semibold transition-all duration-300"
            >
              <MessageCircle size={15} />
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Social icons on mobile */}
          <div className="flex md:hidden items-center gap-2.5">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 hover:bg-gold/10 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-white/30 text-xs text-center sm:text-left order-last sm:order-first">
            © 2026 Harjas Hostel. All Rights Reserved.{' '}
            <span className="hidden sm:inline">|</span>{' '}
            <button onClick={() => {}} className="hover:text-gold transition-colors">Privacy Policy</button>{' '}
            |{' '}
            <button onClick={() => {}} className="hover:text-gold transition-colors">Terms</button>
          </p>

          {/* Credit */}
          <p className="text-white/20 text-xs text-center whitespace-nowrap">
            Designed & Developed by{' '}
            <span className="text-gold/60 font-semibold tracking-wide">Nitro Media</span>
          </p>
        </div>
      </div>
    </footer>
  );
}