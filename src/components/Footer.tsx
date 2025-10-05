import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p className="footerText">Follow us on:</p>
      <div className="footerLinks">
        <a href="https://x.com" className="footerLink" target="_blank" rel="noopener noreferrer">
          X
        </a>
        <a href="https://github.com" className="footerLinks" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://linkedin.com" className="footerLink" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
      <p className="footerCopyright">
        &copy; {new Date().getFullYear()} Weather App. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
