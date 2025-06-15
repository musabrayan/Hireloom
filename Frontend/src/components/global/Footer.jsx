import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="border-t border-border py-8 bg-background transition-colors duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand and copyright */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-extrabold text-foreground font-serif">
              Hire<span className="text-primary">Loom</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1 font-sans">
              © {currentYear} HireLoom. All rights reserved.
            </p>
          </div>

          {/* Social icons */}
          <div className="flex space-x-6">
            {[
              { href: "https://www.instagram.com/musab_rayan17", icon: <FaInstagram />, label: "Facebook" },
              { href: "https://x.com/musabrayan_17", icon: <FaTwitter />, label: "Twitter" },
              { href: "https://www.linkedin.com/in/musab-rayan-87a391267", icon: <FaLinkedin />, label: "LinkedIn" },
              { href: "https://github.com/musabrayan/Hireloom.com/hireloom", icon: <FaGithub />, label: "GitHub" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                aria-label={`HireLoom ${social.label}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  {React.cloneElement(social.icon, { className: 'w-6 h-6' })}
                </motion.div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
