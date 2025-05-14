import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="home-link">
        Go back to Home
      </Link>
    </div>
  );
}
