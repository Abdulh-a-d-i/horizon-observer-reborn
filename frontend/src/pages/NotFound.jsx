
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col items-center justify-center text-center p-4">
      <div className="w-16 h-16 bg-black dark:bg-white rounded-xl flex items-center justify-center mb-6">
        <span className="text-white dark:text-black font-bold text-2xl">R</span>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
