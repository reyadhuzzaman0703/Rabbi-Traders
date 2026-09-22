import "./App.css";

function App() {
  return (
    <div className="app">
      {/* ==================== HERO SECTION ==================== */}
      <section className="hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-overlay"></div>

        {/* Navigation */}
        <header className="header">
          <div className="container header-content">
            <div className="logo">
              Rabbi <span>Traders</span>
            </div>

            <nav className="nav">
              <a href="#home">Home</a>
              <a href="#products">Products</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>

            <div className="header-actions">
              <button className="icon-button">
                Search
              </button>

              <button className="cart-button">
                Cart <span>0</span>
              </button>

              <button className="login-button">
                Login
              </button>
            </div>
          </div>
        </header>

        {/* Hero Content */}
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-label">RABBI TRADERS</h1>
            <br />

            <h1>
              Elevate Your
              <br />
              <span>Living Space</span>
            </h1>

            <p className="hero-description">
              Premium tiles and sanitary products crafted to bring
              elegance, comfort and lasting quality to your home.
            </p>

            <div className="hero-actions">
              <button className="primary-button">
                Explore Products
              </button>

              <button className="secondary-button">
                Discover More
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* ==================== CONTENT AFTER HERO ==================== */}

      <section className="categories" id="products">
        <div className="container">
          <div className="section-heading">
            <p>EXPLORE OUR COLLECTION</p>
            <h2>Designed for Better Living</h2>
          </div>

          <div className="category-grid">
            <div className="category-card">
              <span>01</span>
              <h3>Floor Tiles</h3>
              <p>
                Elegant and durable flooring solutions for
                contemporary spaces.
              </p>
            </div>

            <div className="category-card">
              <span>02</span>
              <h3>Wall Tiles</h3>
              <p>
                Beautiful finishes designed to transform your
                interiors.
              </p>
            </div>

            <div className="category-card">
              <span>03</span>
              <h3>Sanitary</h3>
              <p>
                Premium bathroom essentials and modern fittings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section" id="about">
        <div className="container">
          <p className="section-label">ABOUT RABBI TRADERS</p>
          <h2>Quality that shapes your space.</h2>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="container">
          <p>© 2026 Rabbi Traders. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;