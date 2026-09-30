import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  return (
    <div className="navbar border-b bg-base-100 px-4">
      <div className="flex-1">
        <Link to="/" className="text-lg font-bold">
          Navbar
        </Link>
      </div>
      <div className="flex gap-2">
        <Link to="/" className="btn btn-ghost btn-sm">
          Home
        </Link>
        <Link to="/about" className="btn btn-ghost btn-sm">
          About Me
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="btn btn-primary btn-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;