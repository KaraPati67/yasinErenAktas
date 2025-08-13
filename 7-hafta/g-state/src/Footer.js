import React, { useEffect, useState, useRef } from "react";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function Footer() {
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const footerRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      // Eğer footer ekranın altında ise sadece buton gözüksün
      setIsFooterVisible(rect.bottom <= window.innerHeight);
    }
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <footer ref={footerRef}>
        {isFooterVisible ? (
          <>
            <p>
              © 2025 Tüm hakları saklıdır. | Tasarım: Modern React
            </p>
            <button
              onClick={scrollToTop}
              style={{
                marginTop: "10px",
                padding: "8px 18px",
                borderRadius: "24px",
                border: "none",
                background: "#2575fc",
                color: "#fff",
                fontWeight: "500",
                fontSize: "1em",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(37,117,252,0.15)"
              }}
            >
              ↑ Yukarı Çık
            </button>
          </>
        ) : (
          <button
            onClick={scrollToTop}
            style={{
              margin: "18px auto",
              padding: "10px 22px",
              borderRadius: "24px",
              border: "none",
              background: "#2575fc",
              color: "#fff",
              fontWeight: "500",
              fontSize: "1.1em",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(37,117,252,0.15)",
              display: "block"
            }}
          >
            ↑ Yukarı Çık
          </button>
        )}
      </footer>
    </>
  );
}

export default Footer;