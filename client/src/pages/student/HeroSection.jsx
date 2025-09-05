import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className=" mt-10 relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-6 text-center overflow-hidden">
      {/* subtle background shapes */}
      <div className="absolute inset-0 opacity-20 dark:opacity-30">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white dark:bg-gray-700 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 dark:bg-indigo-700 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <h1 className="text-white text-5xl font-extrabold mb-6 leading-tight drop-shadow-lg">
          Find the <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">Best Courses</span> for You
        </h1>
        <p className="text-gray-100 dark:text-gray-400 mb-10 text-lg">
          🚀 Discover, Learn, and Upskill with our wide range of courses
        </p>

        {/* Search bar */}
        <form
          onSubmit={searchHandler}
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-xl overflow-hidden max-w-xl mx-auto mb-8 border border-gray-200 dark:border-gray-700"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            className="flex-grow border-none focus-visible:ring-0 px-6 py-4 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-lg"
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-r-full hover:from-indigo-700 hover:to-blue-700 transition-all duration-300"
          >
            Search
          </Button>
        </form>

        {/* Explore button */}
        <Button
          onClick={() => navigate(`/course/search?query`)}
          className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-semibold rounded-full px-8  shadow-md hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
        >
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
