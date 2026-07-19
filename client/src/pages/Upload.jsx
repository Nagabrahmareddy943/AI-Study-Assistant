import { useState } from "react";
import { uploadPDF } from "../services/api";

function Upload() {
  const [file, setFile] = useState(null);
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    try {
      setLoading(true);

      const data = await uploadPDF(file);

      console.log(data);

      if (data.success) {
        setCourse(data.summary);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">
            📚 AI Study Assistant
          </h1>

          <p className="text-gray-500 mt-2">
            Upload your study material and generate an AI-powered course.
          </p>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border rounded-lg p-3"
          />

          {file && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="font-semibold text-blue-700">
                📄 Selected File
              </p>

              <p className="text-gray-700 mt-1">
                {file.name}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Generating AI Course..." : "🚀 Generate AI Course"}
          </button>

        </form>

        {/* AI Generated Course */}
        {course && (
          <div className="mt-10">

            <div className="border-t pt-8">

              <h2 className="text-3xl font-bold text-blue-600 mb-6">
                📚 AI Generated Course
              </h2>

              <div className="bg-gray-50 border rounded-xl p-6">

                <pre className="whitespace-pre-wrap text-gray-700 leading-8 font-sans">
                  {course}
                </pre>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Upload;