import useHomepage from "../hooks/useHomepage";

import Hero from "../components/homepage/Hero";
import CTA from "../components/homepage/CTA";
import Statistics from "../components/homepage/Statistics";
import FeaturedProjects from "../components/homepage/FeaturedProjects";
import LatestNews from "../components/homepage/LatestNews";
import Sustainability from "../components/homepage/Sustainability";
import InvestorHighlights from "../components/homepage/InvestorHighlights";
import OperationalStations from "../components/homepage/OperationalStations";

export default function Home() {
  const { data: homepage, isLoading, error, refetch } = useHomepage();

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-5">
          <div className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>

          <div className="text-center">
            <h2 className="text-lg font-semibold text-slate-800">
              Loading NHPC Portal
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Please wait while we fetch the latest information.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full rounded-2xl border border-red-200 bg-white p-8 shadow-lg text-center">
          <div className="text-5xl mb-4">⚠️</div>

          <h2 className="text-2xl font-bold text-slate-800">
            Unable to load the homepage
          </h2>

          <p className="text-slate-500 mt-3">
            {error.message ||
              "Something went wrong while connecting to the server."}
          </p>

          <button
            onClick={refetch}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <Hero hero={homepage?.hero} />

      <Statistics statistics={homepage?.statistics} />

      <FeaturedProjects featuredProjects={homepage?.featuredProjects} />

      <LatestNews latestNews={homepage?.latestNews} />

      <Sustainability sustainability={homepage.sustainability} />

      <InvestorHighlights investorHighlights={homepage.investorHighlights} />

      <OperationalStations operationalStations={homepage.operationalStations} />

      <CTA />
    </main>
  );
}
