function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-blue-600">
          Dashboard
        </h1>

        <p className="mt-4 text-gray-700">
          Welcome back,
        </p>

        <h2 className="text-2xl font-semibold mt-2">
          {user?.name}
        </h2>

        <p className="text-gray-500 mt-2">
          {user?.email}
        </p>
      </div>
    </div>
  );
}

export default Dashboard;