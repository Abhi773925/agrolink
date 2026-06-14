import { Clock3, ShieldCheck, TrendingUp, Truck, Users, Wheat } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Reliable Delivery",
    description: "Operational workflows for timely farm-to-business logistics and fulfillment.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Control",
    description: "Structured listing data and consistent crop details for dependable buying decisions.",
  },
  {
    icon: Clock3,
    title: "Order Visibility",
    description: "Track order lifecycle with transparent status updates and contact details.",
  },
  {
    icon: Users,
    title: "Farmer Network",
    description: "Connect with verified producers and discover opportunities across regions.",
  },
  {
    icon: Wheat,
    title: "Crop-Centric Tools",
    description: "Manage listings, inventory, and crop portfolios in one unified experience.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Commerce",
    description: "Designed for high-volume operations with clean interfaces and consistent workflows.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Core platform capabilities</h2>
          <p className="mt-3 text-base text-gray-600">
            A consistent enterprise experience across procurement, communication, and crop operations.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <feature.icon className="h-6 w-6 text-green-700" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
