import { useEffect, useState } from "react";
import logo from "../../assets/agro.png";

export default function PageTransition({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <img src={logo} alt="AgroLink" className="mb-4 h-14 w-14 rounded-lg object-cover" />
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-green-700" />
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
}