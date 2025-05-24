import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section>
        <h1 className="text-4xl font-bold text-accent mb-6">About AstrAID</h1>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Astra's Story
            </h2>
            <div className="prose max-w-none">
              <p>
                AstrAID was born from a deeply personal journey with our beloved
                rescue dog, Astra. When we first welcomed Astra into our home,
                she was struggling with severe anxiety, fear-based reactivity,
                and medical challenges that made traditional training approaches
                ineffective.
              </p>
              
              <p className="my-4">
                Despite consulting with multiple trainers and veterinary
                behaviorists, we found ourselves overwhelmed by conflicting
                advice and training methodologies. What worked for most dogs
                didn't seem to help Astra's unique situation.
              </p>
              
              <p className="my-4">
                The turning point came when we began using AI to help us research,
                organize, and personalize training techniques specifically for
                Astra's needs. By combining expert knowledge with AI-assisted
                planning and consistent documentation, we were able to create a
                tailored approach that finally helped Astra overcome her
                challenges.
              </p>
              
              <p className="my-4">
                Today, Astra is a confident, happy dog who has made remarkable
                progress. Her journey inspired us to create AstrAID—a platform
                that combines expert canine training knowledge with the
                personalized assistance of AI to help other pet owners facing
                similar challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Our Mission
          </h2>
          <div className="prose max-w-none">
            <p>
              At AstrAID, we believe that every dog deserves a chance to thrive,
              and every owner deserves access to the knowledge and support they
              need to help their canine companion.
            </p>
            
            <p className="my-4">
              Our mission is to democratize access to quality dog training
              resources by:
            </p>
            
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>
                Providing a comprehensive knowledge hub of evidence-based
                training guides
              </li>
              <li>
                Offering personalized AI assistance to help owners navigate
                training challenges
              </li>
              <li>
                Enabling customized training plans that adapt to each dog's
                unique needs
              </li>
              <li>
                Building a supportive community where pet owners can share
                experiences and celebrate progress
              </li>
            </ul>
            
            <p className="my-4">
              We're committed to promoting humane, science-based training
              methods that strengthen the bond between dogs and their humans.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            The Team Behind AstrAID
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="aspect-square bg-gray-200 rounded-lg mb-4 relative">
                {/* Placeholder for team member image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Image Placeholder
                </div>
              </div>
              <h3 className="text-xl font-medium text-accent">Sarah Johnson</h3>
              <p className="text-gray-600">Founder & Canine Behavior Specialist</p>
            </div>
            <div>
              <div className="aspect-square bg-gray-200 rounded-lg mb-4 relative">
                {/* Placeholder for team member image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Image Placeholder
                </div>
              </div>
              <h3 className="text-xl font-medium text-accent">Michael Chen</h3>
              <p className="text-gray-600">AI Engineer & Dog Enthusiast</p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center py-8">
        <h2 className="text-2xl font-semibold text-accent mb-6">
          Join Us in Transforming Dog Training
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/hub"
            className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors"
          >
            Explore Training Guides
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 bg-white border border-accent text-accent rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Create an Account
          </Link>
        </div>
      </section>
    </div>
  );
}
