import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div style={{ padding: 24, textAlign: "center" }}>
      <h1>404 — Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <p>
        <Link to="/">Go to home</Link>
      </p>
    </div>
  );
}
