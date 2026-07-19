import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navLinkClass = (path) =>
    `px-4 py-2 rounded-lg font-medium transition duration-300 ${
      location.pathname === path
        ? "bg-white text-blue-700 shadow-md"
        : "text-white hover:bg-blue-500"
    }`;

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-md">
            📚
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              AI Study Assistant
            </h1>

            <p className="text-blue-100 text-sm">
              Learn Smarter with AI
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3">

          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>

          {token && (
            <>
              <Link
                to="/dashboard"
                className={navLinkClass("/dashboard")}
              >
                Dashboard
              </Link>

              <Link
                to="/upload"
                className={navLinkClass("/upload")}
              >
                Upload
              </Link>
            </>
          )}

          {!token ? (
            <>
              <Link
                to="/login"
                className={navLinkClass("/login")}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-white text-blue-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-white font-semibold">
                  Welcome
                </span>

                <span className="text-blue-100 text-sm">
                  {user?.name || "User"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold transition"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;