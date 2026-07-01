import useHomepage from "../hooks/useHomepage";
import Hero from "../components/homepage/Hero";
import Statistics from "../components/homepage/Statistics";
import FeaturedProjects from "../components/homepage/FeaturedProjects";

export default function Home() {
    const { homepage, loading, error } = useHomepage();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white font-medium text-lg">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mr-4"></div>
                Loading Portal...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
                <div className="text-center p-8 bg-slate-900 border border-slate-800 rounded-2xl max-w-md shadow-2xl">
                    <h2 className="text-xl font-bold text-red-500 mb-2">Error Loading Portal</h2>
                    <p className="text-slate-400 text-sm mb-6">{error.message || "Please check your network connection."}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm cursor-pointer"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-white min-h-screen w-full">
            <Hero homepage={homepage} />
            <Statistics statistics={homepage.statistics} />
            <FeaturedProjects />
        </main>
    );
}