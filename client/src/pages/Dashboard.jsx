import { useEffect, useState } from "react";
import { getUserCourses } from "../services/api";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getUserCourses();

        if (data.success) {
          setCourses(data.courses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-blue-600">
            Welcome, {user?.name || "Student"} 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your AI-generated courses and continue learning.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg text-gray-500">
              📚 Total Courses
            </h2>

            <p className="text-4xl font-bold text-blue-600 mt-3">
              {courses.length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg text-gray-500">
              📄 PDFs Uploaded
            </h2>

            <p className="text-4xl font-bold text-green-600 mt-3">
              {courses.length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg text-gray-500">
              🤖 AI Courses Generated
            </h2>

            <p className="text-4xl font-bold text-purple-600 mt-3">
              {courses.length}
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800">
              🚀 Generate New Course
            </h2>

            <p className="text-gray-500 mt-3">
              Upload your study material and let AI create a complete course.
            </p>

            <button
              onClick={() => (window.location.href = "/upload")}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Upload PDF
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800">
              🤖 AI Assistant
            </h2>

            <p className="text-gray-500 mt-3">
              Ask questions and get explanations from your study materials.
            </p>

            <button
              disabled
              className="mt-6 bg-gray-400 text-white px-6 py-3 rounded-lg cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>

        </div>

        {/* Recent Courses */}
        <div className="bg-white rounded-2xl shadow-lg mt-8 p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            📚 Recent Courses
          </h2>

          {loading ? (
            <p className="text-gray-500">
              Loading courses...
            </p>
          ) : courses.length === 0 ? (
            <div className="border rounded-xl p-6">
              <h3 className="text-xl font-semibold">
                No Courses Yet
              </h3>

              <p className="text-gray-500 mt-2">
                Upload your first PDF to generate an AI-powered course.
              </p>
            </div>
          ) : (
            <div className="space-y-4">

              {courses.map((course) => (
                <div
                  key={course._id}
                  className="border rounded-xl p-6 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-blue-600">
                    {course.title}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Uploaded File: {course.fileName}
                  </p>

                  <p className="text-gray-400 text-sm mt-2">
                    Generated on{" "}
                    {new Date(course.createdAt).toLocaleDateString()}
                  </p>

                  <button
                    className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Course
                  </button>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Dashboard;