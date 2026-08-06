import "./App.css";

function App() {
  return (
    <div className="App">

      {/* Header */}
      <header className="header">
        <div className="logo">
          <h1>NETFLIX</h1>
        </div>

        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/">TV Shows</a>
          <a href="/">Movies</a>
          <a href="/">New & Popular</a>
          <a href="/">My List</a>
        </nav>

        <div className="profile">
          <button className="search-btn">Search</button>
          <img
            src="MID.JPG"
            alt="profile"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="content">
        <h2>Welcome to Netflix</h2>
        <p>
          This page demonstrates a replica of the Netflix Header and Footer
          using only HTML and CSS.
        </p>
      </main>

      {/* Footer */}
      <footer className="footer">

        <div className="footer-top">
          <a href="/">FAQ</a>
          <a href="/">Help Center</a>
          <a href="/">Terms of Use</a>
          <a href="/">Privacy</a>
        </div>

        <div className="footer-bottom">
          <p> 2026 Netflix Clone. Educational Purpose Only.</p>
        </div>

      </footer>

    </div>
  );
}

export default App;