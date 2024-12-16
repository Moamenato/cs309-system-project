import { Link } from "react-router-dom";

export default function CartPage() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Cart Page</h1>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/contact">ContactUs</Link>
      </header>
    </div>
  );
}
