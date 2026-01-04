import { GitHubCalendar } from "react-github-calendar";

export function GithubContribution() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        GitHub Contributions
      </h3>
      <div className="overflow-x-auto">
        <GitHubCalendar
          username="Syahridho"
          colorScheme="light"
          fontSize={14}
          blockSize={12}
          blockMargin={4}
        />
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Contribution activity of <strong>Syahridho</strong> on GitHub.
      </p>
    </div>
  );
}
