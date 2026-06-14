import { CheckCircle2, Search, ShoppingCart, Truck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse",
    description: "Find crops by category, region, and inventory details.",
  },
  {
    icon: ShoppingCart,
    title: "Order",
    description: "Use a streamlined checkout flow with clear payment options.",
  },
  {
    icon: Truck,
    title: "Track",
    description: "Monitor order status and seller information in real time.",
  },
  {
    icon: CheckCircle2,
    title: "Receive",
    description: "Confirm delivery and continue sourcing from trusted suppliers.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">How AgroLink works</h2>
          <p className="mt-3 text-base text-gray-600">A simple workflow built for operational clarity and speed.</p>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <div className="mb-4 flex items-center justify-between">
                <step.icon className="h-6 w-6 text-green-700" />
                <span className="text-xs font-semibold text-gray-500">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="text-base font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorksSection;
