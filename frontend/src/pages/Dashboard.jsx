
import { Link } from "react-router-dom";
import Profile from "../components/Profile";
import Logout from "../components/Logout";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const features = [
    {
      icon: "🔬",
      title: "Disease Detection",
      description: "Identify crop diseases using AI-powered image analysis.",
      link: "/disease-detection",
      button: "Detect Disease",
    },
    {
      icon: "🌦️",
      title: "Weather Forecast",
      description: "Check current weather and five-day forecasts.",
      link: "/weather",
      button: "Check Weather",
    },
    {
      icon: "📋",
      title: "Prediction History",
      description: "View your previous crop disease predictions.",
      link: "/history",
      button: "View History",
    },
    {
      icon: "🤖",
      title: "AI Farming Assistant",
      description: "Get help with crop diseases and farming questions.",
      link: "/chatbot",
      button: "Ask AI",
    },
  ];

  return (
    <div className="dashboard-page">

      {/* Welcome Section */}
      <section className="dashboard-welcome">
        <div>
          <p className="welcome-label">FARMER DASHBOARD</p>

          <h1>
            Welcome back, {user.name || "Farmer"}! 🌱
          </h1>

          <p>
            Manage your crops and make smarter farming decisions
            with your Intelligent Farming Assistant.
          </p>

          <Link to="/disease-detection" className="dashboard-primary-btn">
            Start Disease Detection →
          </Link>
        </div>

        <div className="welcome-icon">🌾</div>
      </section>

      {/* Statistics */}
      <section className="dashboard-stats">
        <div className="stat-card">
          <span>🌱</span>
          <div>
            <h3>AI Powered</h3>
            <p>Crop Analysis</p>
          </div>
        </div>

        <div className="stat-card">
          <span>🌦️</span>
          <div>
            <h3>5 Days</h3>
            <p>Weather Forecast</p>
          </div>
        </div>

        <div className="stat-card">
          <span>🤖</span>
          <div>
            <h3>Smart AI</h3>
            <p>Farming Assistance</p>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="dashboard-features">

        <div className="section-heading">
          <h2>Explore Features</h2>
          <p>Everything you need to manage your farming activities.</p>
        </div>

        <div className="feature-grid">

          {features.map((feature) => (
            <div className="feature-card" key={feature.title}>

              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

              <Link to={feature.link}>
                {feature.button} →
              </Link>

            </div>
          ))}

        </div>
      </section>

      {/* Farming Tip */}
      <section className="farming-tip">
        <div className="tip-icon">💡</div>

        <div>
          <h3>Smart Farming Tip</h3>
          <p>
            Regularly inspect your crop leaves for unusual spots,
            discoloration and pest activity. Early detection can
            help reduce crop damage.
          </p>
        </div>
      </section>

      {/* Profile */}
      <section className="dashboard-profile">
        <h2>Your Account</h2>
        <Profile />
      </section>

      <div className="dashboard-logout">
        <Logout />
      </div>

    </div>
  );
}

export default Dashboard;
