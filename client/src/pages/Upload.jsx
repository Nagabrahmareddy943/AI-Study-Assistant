import { useState } from "react";
import { uploadPDF } from "../services/api";

function Upload() {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    try {
      const data = await uploadPDF(file);

      console.log(data);

      if (data.success) {
        alert(data.summary);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Upload Study Notes
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Upload PDF
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;