import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserCourses } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

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
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Welcome */}
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

            <h2 className="text-2xl font-bold">
              🚀 Generate New Course
            </h2>

            <p className="text-gray-500 mt-3">
              Upload a PDF and generate an AI-powered course.
            </p>

            <button
              onClick={() => navigate("/upload")}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Upload PDF
            </button>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold">
              🤖 AI Assistant
            </h2>

            <p className="text-gray-500 mt-3">
              Chat with your study material.
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

          <h2 className="text-2xl font-bold mb-6">
            📚 Recent Courses
          </h2>

          {loading ? (
            <p>Loading...</p>
          ) : courses.length === 0 ? (
            <div className="border rounded-xl p-6">
              <h3 className="text-xl font-bold">
                No Courses Yet
              </h3>

              <p className="text-gray-500 mt-2">
                Upload your first PDF.
              </p>
            </div>
          ) : (
            <div className="space-y-5">

              {courses.map((course) => (

                <div
                  key={course._id}
                  className="border rounded-xl p-6 bg-gray-50"
                >

                  <h3 className="text-2xl font-bold text-blue-600">
                    {course.title}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {course.fileName}
                  </p>

                  <p className="text-sm text-gray-400 mt-2">
                    {new Date(course.createdAt).toLocaleString()}
                  </p>

                  <button
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
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