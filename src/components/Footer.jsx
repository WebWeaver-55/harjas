import { MessageCircle } from 'lucide-react';

// SVG icons for social media (Lucide doesn't include brand icons)
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

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Amenities', href: '#amenities' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
];

const roomLinks = [
  { name: 'Boys Hostel', href: '#rooms' },
  { name: 'Girls Hostel', href: '#rooms' },
  { name: 'Single Room', href: '#rooms' },
  { name: 'Twin Sharing', href: '#rooms' },
  { name: 'Triple Sharing', href: '#rooms' },
];

const socialLinks = [
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: FacebookIcon, href: '#', label: 'Facebook' },
  { icon: YoutubeIcon, href: '#', label: 'YouTube' },
  { icon: MessageCircle, href: 'https://wa.me/91XXXXXXXXXX', label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer className="bg-teal-dark pt-16 pb-6">
      <div className="container-custom">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Logo Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src="/images/harjas-logo.png"
              alt="Harjas Hostel"
              className="h-14 w-auto mb-4"
            />
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Your home away from home, near UPES Dehradun. Premium student living with world-class amenities.
            </p>
            <p className="text-gold text-xs mt-3 font-medium tracking-wide">
              Your Space. Your Pace.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-gold text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Rooms */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
              Rooms
            </h4>
            <ul className="space-y-2.5">
              {roomLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-gold text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/40 text-sm">
                <span>📞</span>
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-start gap-2 text-white/40 text-sm">
                <span>📧</span>
                <span>info@harjashostel.com</span>
              </li>
              <li className="flex items-start gap-2 text-white/40 text-sm">
                <span>📍</span>
                <span>Near UPES Campus,<br />Bidholi, Dehradun</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gold/30 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 hover:bg-gold/10 transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <p className="text-white/30 text-xs text-center">
              © 2025 Harjas Hostel. All Rights Reserved. |{' '}
              <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a> |{' '}
              <a href="#" className="hover:text-gold transition-colors">Terms</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
