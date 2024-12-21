import { Link } from "react-router-dom";
import "./AdminHeader.css";

export default function Header() {
  const navLinks = [
    { path: "/admin/Dashboard", label: "Dashboard" },
    { path: "/admin/user-management", label: "User Management" },
    { path: "/admin/item-management", label: "Item Management" },
    { path: "/admin/settings", label: "Profile" },
  ];

  return (
    <header className="admin-header">
      <nav>
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
