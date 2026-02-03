import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Ayoola Ogunrekun</h1>
        <p className="text-xl text-gray-400 mb-8">
          Writer, Software Engineer, Expert, Entrepreneur, Creator
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/contact">
            <Button variant="primary">Work with Ayoola</Button>
          </Link>
          <Link href="/portfolio">
            <Button variant="secondary">View Portfolio</Button>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-yellow-500">
            Featured Thoughts
          </h2>
          <p className="text-gray-400">[Blog posts placeholder]</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-yellow-500">
            Featured Work
          </h2>
          <p className="text-gray-400">[Portfolio projects placeholder]</p>
        </div>
      </section>
    </div>
  );
}
