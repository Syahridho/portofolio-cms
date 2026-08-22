"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useEffect, useState } from "react";

export function GithubContribution() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        GitHub Contributions
      </h3>
      <div className="w-full overflow-x-auto">
        <GitHubCalendar
          username="Syahridho"
          colorScheme="light"
          fontSize={isMobile ? 10 : 14}
          blockSize={isMobile ? 8 : 12}
          blockMargin={isMobile ? 2 : 4}
        />
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Contribution activity of <strong>Syahridho</strong> on GitHub.
      </p>
    </div>
  );
}
