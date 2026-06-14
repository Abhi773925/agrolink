import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const highlights = useMemo(
    () => [
      { title: "Verified Farmers", value: "15,000+" },
      { title: "Daily Orders", value: "5,000+" },
      { title: "Cities Served", value: "500+" },
    ],
    []
  );

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">
              Enterprise Agri Commerce Platform
            </p>
            <h1 className="text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Connecting farmers and buyers through a clean digital marketplace.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
              AgroLink provides a production-ready ecosystem for crop listing, transparent ordering, logistics visibility,
              and farmer collaboration.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate("/marketplace")}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-green-700 px-6 text-sm font-medium text-white hover:bg-green-800"
              >
                Explore Marketplace
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button
                onClick={() => navigate("/listing")}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-6 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Create Listing
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
            <img
              src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1600&q=80"
              alt="Farm produce"
              className="h-full min-h-64 w-full object-cover"
            />
          </div>
        </div>

        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <dt className="text-sm text-gray-600">{item.title}</dt>
              <dd className="mt-1 text-2xl font-semibold text-gray-900">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default HeroSection;
