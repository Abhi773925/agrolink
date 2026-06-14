import { Award, ShoppingBag, Truck, Users } from "lucide-react";
import { useEffect, useState } from "react";

const stats = [
  { icon: Users, label: "Active Farmers", value: 15000, suffix: "+" },
  { icon: ShoppingBag, label: "Orders Completed", value: 250000, suffix: "+" },
  { icon: Truck, label: "Daily Deliveries", value: 5000, suffix: "+" },
  { icon: Award, label: "Satisfaction", value: 98, suffix: "%" },
];

const StatsSection = () => {
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const duration = 1400;
    const steps = 50;
    const interval = duration / steps;

    const timers = stats.map((stat, index) => {
      let current = 0;
      const increment = stat.value / steps;
      return setInterval(() => {
        current += increment;
        setCounts((prev) => {
          const next = [...prev];
          next[index] = Math.min(Math.floor(current), stat.value);
          return next;
        });
      }, interval);
    });

    const cleanup = setTimeout(() => {
      timers.forEach((timer) => clearInterval(timer));
      setCounts(stats.map((stat) => stat.value));
    }, duration + 100);

    return () => {
      timers.forEach((timer) => clearInterval(timer));
      clearTimeout(cleanup);
    };
  }, []);

  return (
    <section className="bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Operational impact</h2>
          <p className="mt-3 text-base text-gray-600">Measured outcomes across farmer onboarding, ordering, and delivery.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <article key={stat.label} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <stat.icon className="h-6 w-6 text-green-700" />
              <p className="mt-4 text-3xl font-semibold text-gray-900">
                {counts[index].toLocaleString()}
                {stat.suffix}
              </p>
              <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
