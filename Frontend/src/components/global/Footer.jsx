import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8 bg-background transition-colors duration-300">
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
            <a
              href="https://facebook.com/hireloom"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="HireLoom Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="w-6 h-6" />
            </a>

            <a
              href="https://twitter.com/hireloom"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="HireLoom Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="w-6 h-6" />
            </a>

            <a
              href="https://linkedin.com/company/hireloom"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="HireLoom LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>

            <a
              href="https://github.com/hireloom"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="HireLoom GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;