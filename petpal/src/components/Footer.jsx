import React from "react";

function Footer() {
  return (
    // Main footer container with class for styling
    <footer className="footer">
      <div className="footer-top">
        {}
        <div className="footer-brand">
          <h2>PetPal</h2> {}
          <p>Your trusted pet care companion. Simple, safe, smart.</p>
        </div>

        {}
        <div className="footer-newsletter">
          <h4>Never miss a bark! Join our mailing list for smart pet care updates.</h4>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            {}
            <input type="email" placeholder="Your email address" />
            {}
            <button type="submit">Subscribe</button>
          </form>
        </div>

        {}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Nairobi, Kenya</p>
          <p>+254 712 444 678</p>
          <p>support@petpal.co.ke</p>
        </div>
      </div>

      {}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} PetPal. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
