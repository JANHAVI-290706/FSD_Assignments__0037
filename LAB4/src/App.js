import { useState } from "react";
import "./App.css";

function App() {
  const [registration, setRegistration] = useState({
    fullName: "",
    emailAddress: "",
    mobileNumber: "",
    institution: "",
    password: "",
    category: "",
  });

  const [notification, setNotification] = useState("");

  const updateField = (e) => {
    const { name, value } = e.target;

    setRegistration({
      ...registration,
      [name]: value,
    });
  };

  const displayNotification = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const submitRegistration = (e) => {
    e.preventDefault();

    if (
      !registration.fullName ||
      !registration.emailAddress ||
      !registration.mobileNumber ||
      !registration.institution ||
      !registration.password ||
      !registration.category
    ) {
      displayNotification("⚠️ Please complete all the required fields.");
      return;
    }

    if (!registration.emailAddress.includes("@")) {
      displayNotification("❌ Please provide a valid email address.");
      return;
    }

    if (registration.mobileNumber.length !== 10) {
      displayNotification("📱 Mobile number must contain 10 digits.");
      return;
    }

    if (registration.password.length < 6) {
      displayNotification("🔐 Password should contain at least 6 characters.");
      return;
    }

    displayNotification("🎉 You are successfully registered!");

    console.log("Participant Details:", registration);

    setRegistration({
      fullName: "",
      emailAddress: "",
      mobileNumber: "",
      institution: "",
      password: "",
      category: "",
    });
  };

  const moveToRegistration = () => {
    document
      .getElementById("registration")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="website">

      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      {/* Navigation */}
      <header className="topbar">
        <div className="brand">
          <h2>InnovateX 💡</h2>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#features">Explore</a>
          <a href="#registration">Join Us</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero-section" id="home">
        <div className="hero-text">

          <p className="welcome-text">
            DISCOVER • CREATE • INNOVATE
          </p>

          <h1>InnovateX 2026</h1>

          <p>
            A creative platform where students transform
            innovative ideas into exciting real-world solutions.
          </p>

          <button onClick={moveToRegistration}>
            Join the Experience
          </button>

        </div>
      </section>

      {/* Features */}
      <section className="features-section" id="features">

        <h2>Explore InnovateX</h2>

        <p className="section-description">
          Participate in exciting challenges, showcase your
          creativity and connect with other young innovators.
        </p>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="icon">🤖</div>
            <h3>Robotics Arena</h3>
            <p>
              Build creative robotic solutions and demonstrate
              your engineering skills.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🚀</div>
            <h3>Startup Pitch</h3>
            <p>
              Present your innovative business idea and inspire
              the audience with your vision.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🧠</div>
            <h3>AI Challenge</h3>
            <p>
              Solve interesting artificial intelligence problems
              and explore the future of technology.
            </p>
          </div>

        </div>

      </section>

      {/* Registration */}
      <section className="registration-section" id="registration">

        <div className="registration-box">

          <h2>Participant Registration</h2>

          <p>
            Enter your information below to reserve your place
            at InnovateX 2026.
          </p>

          <form onSubmit={submitRegistration}>

            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={registration.fullName}
              onChange={updateField}
            />

            <label>Email Address</label>

            <input
              type="email"
              name="emailAddress"
              placeholder="Enter your email address"
              value={registration.emailAddress}
              onChange={updateField}
            />

            <label>Mobile Number</label>

            <input
              type="tel"
              name="mobileNumber"
              placeholder="Enter 10 digit mobile number"
              value={registration.mobileNumber}
              onChange={updateField}
            />

            <label>Institution</label>

            <input
              type="text"
              name="institution"
              placeholder="Enter your college or institution"
              value={registration.institution}
              onChange={updateField}
            />

            <label>Create Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={registration.password}
              onChange={updateField}
            />

            <label>Select Category</label>

            <select
              name="category"
              value={registration.category}
              onChange={updateField}
            >
              <option value="">
                -- Select a category --
              </option>

              <option value="Robotics Arena">
                Robotics Arena
              </option>

              <option value="Startup Pitch">
                Startup Pitch
              </option>

              <option value="AI Challenge">
                AI Challenge
              </option>
            </select>

            <button type="submit">
              Complete Registration
            </button>

          </form>

        </div>

      </section>

      {/* Footer */}
      <footer className="footer">

        <h3>InnovateX 💡</h3>

        <p>
          Turning student ideas into tomorrow's innovations.
        </p>

        <p>
          © 2026 InnovateX. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default App;