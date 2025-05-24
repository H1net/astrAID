import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-12 md:py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-accent mb-6">
            Empower Your Dog Training Journey with{" "}
            <span className="text-primary">AstrAID</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Access expert canine training guides and get personalized assistance
            with our AI-powered platform designed for pet owners.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/hub"
              className="px-8 py-3 bg-primary text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors"
            >
              Explore Training Guides
            </Link>
            <Link
              href="/chat"
              className="px-8 py-3 bg-white border border-accent text-accent rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Chat with AI Assistant
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white rounded-xl shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-accent mb-12">
            How AstrAID Helps You
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-accent mb-2">
                Knowledge Hub
              </h3>
              <p className="text-gray-600">
                Access a comprehensive library of training guides for dogs of all
                ages and temperaments.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-accent mb-2">
                AI Assistant
              </h3>
              <p className="text-gray-600">
                Get immediate answers to your training questions from our
                AI-powered assistant.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-accent mb-2">
                Training Plans
              </h3>
              <p className="text-gray-600">
                Create personalized training schedules tailored to your dog's
                needs and your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-accent mb-6">
            Start Your Dog's Training Journey Today
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community of pet owners and transform your relationship with
            your canine companion.
          </p>
          <Link
            href="/register"
            className="px-8 py-3 bg-success text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors"
          >
            Sign Up for Free
          </Link>
        </div>
      </section>
    </div>
  );
}
