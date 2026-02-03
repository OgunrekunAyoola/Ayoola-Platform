export default function Services() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-yellow-500">Services</h1>
      <p className="text-xl text-gray-400 mb-12">
        High-value consulting and execution for founders, policymakers, and tech leaders.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-white">Consulting</h2>
          <p className="text-gray-400 mb-6">
            Strategic advice on product development, technical architecture, and team building.
          </p>
          <ul className="space-y-2 text-gray-300">
            <li>• Tech Strategy</li>
            <li>• Product Roadmap</li>
            <li>• Team Scaling</li>
          </ul>
        </div>

        <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-white">Engineering</h2>
          <p className="text-gray-400 mb-6">
            Hands-on development of MVPs, prototypes, and complex web applications.
          </p>
          <ul className="space-y-2 text-gray-300">
            <li>• Full Stack Development</li>
            <li>• MVP Prototyping</li>
            <li>• Performance Optimization</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
