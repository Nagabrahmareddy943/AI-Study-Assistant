import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById, chatWithCourse } from "../services/api";

function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

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

  const handleAskAI = async () => {
    if (!question.trim()) return;

    try {
      setChatLoading(true);

      const data = await chatWithCourse(id, question);

      if (data.success) {
        setAnswer(data.answer);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to get AI response.");
    } finally {
      setChatLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold">Loading Course...</h2>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold text-red-600">
          Course Not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-blue-600">
            {course.title}
          </h1>

          <p className="text-gray-500 mt-2">
            {course.fileName}
          </p>

          <div className="mt-8 whitespace-pre-wrap leading-8 text-gray-800">
            {course.content}
          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-lg mt-10 p-8">

          <h2 className="text-3xl font-bold text-gray-800">
            🤖 Ask AI
          </h2>

          <p className="text-gray-500 mt-2">
            Ask anything about this course.
          </p>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Example: Explain Module 2 in simple words."
            className="w-full border rounded-lg mt-6 p-4 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
                    <button
            onClick={handleAskAI}
            disabled={chatLoading}
            className={`mt-6 px-6 py-3 rounded-lg text-white font-semibold transition ${
              chatLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {chatLoading ? "Thinking..." : "Ask AI"}
          </button>

          {answer && (
            <div className="mt-8 border-t pt-6">

              <h3 className="text-2xl font-bold text-green-600 mb-4">
                AI Response
              </h3>

              <div className="bg-gray-50 border rounded-xl p-6 whitespace-pre-wrap leading-8 text-gray-800">
                {answer}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default CourseDetails;