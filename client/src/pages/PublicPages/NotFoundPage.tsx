import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">404</h1>
      <p className="text-xl md:text-2xl mb-8">Page Not Found</p>
      <p className="text-base md:text-lg text-center max-w-md mb-8">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
