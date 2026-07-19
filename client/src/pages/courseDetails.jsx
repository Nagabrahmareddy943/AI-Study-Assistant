import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById } from "../services/api";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);

        if (data.success) {
          setCourse(data.course);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading Course...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-red-600">
          Course Not Found
        </h2>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800"
        >
          ← Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-blue-600">
            {course.title}
          </h1>

          <p className="text-gray-500 mt-3">
            Uploaded File: {course.fileName}
          </p>

          <p className="text-gray-400 text-sm mt-2">
            Generated on{" "}
            {new Date(course.createdAt).toLocaleString()}
          </p>

          <hr className="my-8" />

          <div className="whitespace-pre-wrap leading-8 text-gray-700">
            {course.content}
          </div>

        </div>

      </div>

    </div>
  );
}

export default CourseDetails;