import {Fragment} from 'react';

export const meta = () => [{title: 'Cheeky Prints – Template'}];

export const links = () => [{rel: 'stylesheet', href: '/template/styles.css'}];

export default function Index() {
  return (
    <Fragment>
      <header className="hero">
        <img
          src="https://via.placeholder.com/1600x600"
          alt="Hero Placeholder"
        />
        <div className="hero-text">
          <h1>Welcome to Cheeky Prints</h1>
          <p>Bold designs for every mood</p>
        </div>
      </header>

      <section className="features">
        <div className="feature">
          <img src="https://via.placeholder.com/100" alt="Vibrant Colors icon" />
          <h3>Vibrant Colors</h3>
          <p>Prints that pop with personality.</p>
        </div>
        <div className="feature">
          <img src="https://via.placeholder.com/100" alt="Eco-Friendly icon" />
          <h3>Eco-Friendly Inks</h3>
          <p>Sustainable processes for guilt-free swag.</p>
        </div>
        <div className="feature">
          <img src="https://via.placeholder.com/100" alt="Fast Shipping icon" />
          <h3>Fast Shipping</h3>
          <p>From our studio to your door in a flash.</p>
        </div>
      </section>

      <section className="products">
        <h2>Featured Prints</h2>
        <div className="product-grid">
          <div className="product">
            <img src="https://via.placeholder.com/300" alt="Print 1" />
            <h4>Print Title</h4>
            <p>$00.00</p>
          </div>
          <div className="product">
            <img src="https://via.placeholder.com/300" alt="Print 2" />
            <h4>Print Title</h4>
            <p>$00.00</p>
          </div>
          <div className="product">
            <img src="https://via.placeholder.com/300" alt="Print 3" />
            <h4>Print Title</h4>
            <p>$00.00</p>
          </div>
          <div className="product">
            <img src="https://via.placeholder.com/300" alt="Print 4" />
            <h4>Print Title</h4>
            <p>$00.00</p>
          </div>
        </div>
      </section>

      <section className="about">
        <img
          src="https://via.placeholder.com/600x400"
          alt="About Placeholder"
        />
        <div className="about-text">
          <h2>About Cheeky Prints</h2>
          <p>
            Insert brand story or mission statement here. This section spotlights
            what makes our prints stand out from the crowd.
          </p>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Cheeky Prints. All rights reserved.</p>
      </footer>
    </Fragment>
  );
}
