import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 py-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
        <p className="text-gray-400 mb-8">Could not find the requested resource.</p>
        <Link
          href="/"
          className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400 transition-colors"
        >
          Return Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
