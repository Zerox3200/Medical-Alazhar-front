import React from "react";
import './Hero.scss';

const Hero = () => {
  return (
    <section className="hero">

      <div className="hero__content">
        <div className="hero__container">
          <div className="hero__text-content">
            <div className="hero__badge">
              <span className="hero__badge-text">Faculty of Medicine</span>
            </div>

            <h1 className="hero__title">
              Al-Azhar University
              <span className="hero__subtitle">Medical Education Excellence</span>
            </h1>

            <p className="hero__description">
              Empowering the next generation of healthcare professionals through
              innovative medical education, cutting-edge research, and comprehensive
              clinical training. Join us in advancing medical knowledge and patient care.
            </p>

            <div className="hero__cta-group">
              <a href="/courses" className="hero__cta-primary">
                Explore Programs
              </a>

              <a href="/about" className="hero__cta-secondary">
                Learn About Us
              </a>
            </div>

            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-number">50+</span>
                <span className="hero__stat-label">Years of Excellence</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-number">10,000+</span>
                <span className="hero__stat-label">Graduates</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-number">100+</span>
                <span className="hero__stat-label">Expert Faculty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <div className="hero__scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;
