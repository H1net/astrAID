import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-accent text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AstrAID</h3>
            <p className="text-gray-300">
              Helping pet owners access and discuss canine training guides with AI assistance.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/hub" className="text-gray-300 hover:text-primary">
                  Training Hub
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-gray-300 hover:text-primary">
                  AI Assistant
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-300">
              Have questions or feedback? Reach out to us.
            </p>
            <Link 
              href="mailto:contact@astraid.com" 
              className="mt-2 inline-block text-primary hover:underline"
            >
              contact@astraid.com
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} AstrAID. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
