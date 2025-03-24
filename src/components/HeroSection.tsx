import { useState } from "react";
import { Search, Calendar, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl my-6">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-health-blue/20 to-health-purple/20 animate-pulse-slow">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent dark:from-gray-900/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 glass-panel rounded-2xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight gradient-text">
            Your Personal Health Companion
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            Track, Learn, Connect
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-health-blue hover:bg-health-blue/90 text-white btn-hover-effect group"
            >
              <Calendar className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Book a Session Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-health-purple text-health-purple hover:bg-health-purple/10 micro-bounce icon-hover-effect"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Ask the AI Health Assistant
            </Button>
          </div>

          {/* Search bar */}
          <div
            className={cn(
              "max-w-md mx-auto mt-8 relative transition-all duration-300",
              isSearchFocused ? "scale-105" : ""
            )}
          >
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for health information..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-10 pr-4 py-3 border-health-blue/30 focus:border-health-blue rounded-full shadow-md"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>

            {/* Autocomplete suggestions would go here */}
            {isSearchFocused && searchQuery && (
              <div className="absolute w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  Health benefits of {searchQuery}
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  {searchQuery} symptoms
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  Common questions about {searchQuery}
                </div>
              </div>
            )}
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Powered by AI to provide personalized health insights
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
