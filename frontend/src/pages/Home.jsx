
import { Link } from "react-router-dom";

function Home() {
  const features = [
    {
      icon: "🔬",
      title: "AI Disease Detection",
      description:
        "Upload crop leaf images and identify possible diseases using our trained AI model.",
    },
    {
      icon: "🌦️",
      title: "Weather Forecast",
      description:
        "Check current weather conditions and five-day forecasts for better planning.",
    },
    {
      icon: "🤖",
      title: "AI Farming Assistant",
      description:
        "Get assistance with crop health, farming practices and agricultural questions.",
    },
    {
      icon: "📊",
      title: "Prediction History",
      description:
        "Access your previous crop disease predictions whenever you need them.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Upload Crop Image",
      description: "Select a clear photograph of an affected crop leaf.",
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our trained model analyzes the image for possible diseases.",
    },
    {
      number: "03",
      title: "Get Results",
      description: "View the prediction, confidence and relevant farming guidance.",
    },
  ];

  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">

          <span className="hero-tag">
            🌱 SMART AGRICULTURE PLATFORM
          </span>

          <h1>
            Grow Smarter with
            <span> Intelligent Farming</span>
          </h1>

          <p>
            Use artificial intelligence to identify possible crop
            diseases, monitor weather conditions and make
            informed farming decisions.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="hero-primary-btn">
              Get Started →
            </Link>

            <Link to="/login" className="hero-secondary-btn">
              Login
            </Link>
          </div>

          <div className="hero-note">
            🌿 Smarter insights for better farming decisions
          </div>

        </div>

        <div className="hero-visual">
          <div className="hero-image-card">
            <div className="hero-plant">🌿</div>
            <h3>Smart Crop Monitoring</h3>
            <p>Technology supporting modern agriculture</p>
          </div>

          <div className="hero-floating-card">
            <span>🌱</span>
            <div>
              <strong>AI Powered</strong>
              <p>Crop Analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="home-features">

        <div className="home-section-heading">
          <span>OUR FEATURES</span>
          <h2>Everything Farmers Need</h2>
          <p>
            Useful digital tools to support everyday farming decisions.
          </p>
        </div>

        <div className="home-feature-grid">
          {features.map((feature) => (
            <div className="home-feature-card" key={feature.title}>
              <div className="home-feature-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </div>
          ))}
        </div>

      </section>

      {/* How it works */}
      <section className="how-it-works">

        <div className="home-section-heading">
          <span>SIMPLE PROCESS</span>
          <h2>How Disease Detection Works</h2>
          <p>
            Get an AI-generated crop health prediction in three steps.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <div className="step-card" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>

      </section>

      {/* CTA */}
      <section className="home-cta">
        <h2>Ready to Make Farming Smarter?</h2>

        <p>
          Create your account and explore AI-powered farming tools.
        </p>

        <Link to="/register">
          Create Free Account →
        </Link>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div>
          <h2>🌱 FarmAssist</h2>
          <p>
            Intelligent Farming Assistant
          </p>
        </div>

        <p>
          Supporting smarter farming through technology.
        </p>

        <small>
          © {new Date().getFullYear()} FarmAssist. All rights reserved.
        </small>
      </footer>

    </div>
  );
}

export default Home;
