import { Link } from "react-router-dom";
import { useEffect } from "react";
import { testBackend } from "../services/api";
function Home() {useEffect(() => {
  const checkBackend = async () => {
    try {
      const data = await testBackend();
      console.log("Backend:", data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  checkBackend();
}, []);
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Study Smarter with
            <span className="text-blue-600"> AI Assistance</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            AI Study Assistant helps students understand concepts faster,
            summarize study materials, and learn efficiently using artificial
            intelligence.
          </p>

          <div className="mt-8 flex gap-4">

            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Login
            </Link>

          </div>
        </div>


        {/* Illustration */}
        <div className="flex justify-center">

          <div className="bg-white shadow-xl rounded-3xl p-10">

            <div className="text-7xl text-center">
              🤖
            </div>

            <h3 className="text-xl font-bold text-center mt-5">
              Your AI Learning Partner
            </h3>

            <p className="text-gray-500 text-center mt-2">
              Learn, analyze, and improve your knowledge.
            </p>

          </div>

        </div>

      </section>



      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-bold text-center text-gray-900">
          Powerful Features
        </h2>

        <p className="text-center text-gray-600 mt-3">
          Everything you need for smarter learning.
        </p>


        <div className="grid md:grid-cols-3 gap-8 mt-10">


          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">

            <div className="text-4xl">
              📄
            </div>

            <h3 className="text-xl font-bold mt-4">
              PDF Analysis
            </h3>

            <p className="text-gray-600 mt-2">
              Upload study documents and get AI-powered summaries.
            </p>

          </div>



          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">

            <div className="text-4xl">
              🤖
            </div>

            <h3 className="text-xl font-bold mt-4">
              AI Tutor
            </h3>

            <p className="text-gray-600 mt-2">
              Ask questions and receive intelligent explanations.
            </p>

          </div>



          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">

            <div className="text-4xl">
              📝
            </div>

            <h3 className="text-xl font-bold mt-4">
              Smart Notes
            </h3>

            <p className="text-gray-600 mt-2">
              Generate notes and improve your learning process.
            </p>

          </div>


        </div>

      </section>


    </div>
  );
}

export default Home;