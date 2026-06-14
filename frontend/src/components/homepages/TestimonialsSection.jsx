import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Organic Farmer",
    text: "AgroLink helps me manage buyers and orders with confidence. The flow is clear and reliable.",
  },
  {
    name: "Priya Sharma",
    role: "Consumer",
    text: "The ordering interface is straightforward and product details are always readable and consistent.",
  },
  {
    name: "Amit Patel",
    role: "Restaurant Owner",
    text: "Bulk procurement is easier now because listings and seller details are standardized.",
  },
];

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Customer feedback</h2>
          <p className="mt-3 text-base text-gray-600">Trusted by farmers, buyers, and business operators.</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm sm:p-8">
          <div className="mb-4 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
            ))}
          </div>
          <blockquote className="text-lg leading-8 text-gray-900">"{current.text}"</blockquote>
          <p className="mt-4 text-sm font-semibold text-gray-900">{current.name}</p>
          <p className="text-sm text-gray-600">{current.role}</p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            onClick={() => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIndex((prev) => (prev + 1) % testimonials.length)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
