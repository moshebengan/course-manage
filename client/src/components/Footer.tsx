import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <p>&copy; 2024 MOSHIKO_BG. All Rights Reserved</p>
      <div className="footer__links">
        {["About", "Privacy Policy", "Licensing", "Contact"].map(
          (item, index) => (
            <Link
              key={index}
              href={`/${item.toLowerCase().replace(" ", "-")}`}
              className="footer__link"
              scroll={false}
            >
              {item}
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Footer;
