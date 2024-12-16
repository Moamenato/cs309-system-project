import { Link } from "react-router-dom";

export default function ProfilePage() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Profile Page</h1>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/contact">ContactUs</Link>
      </header>
    </div>
  );
}
