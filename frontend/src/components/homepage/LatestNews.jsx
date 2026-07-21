import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../ui/Container";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";

import FeaturedNewsCard from "../news/FeaturedNewsCard";
import NewsListItem from "../news/NewsListItem";

const HOMEPAGE_LIMIT = 5;
const FEATURED_COUNT = 2;

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

export default function LatestNews({ latestNews }) {
    if (
        !latestNews ||
        !latestNews.isVisible ||
        !latestNews.items?.length
    ) {
        return null;
    }

    // Only show the first few news items on homepage
    const news = latestNews.items.slice(0, HOMEPAGE_LIMIT);

    const featuredNews = news.slice(0, FEATURED_COUNT);
    const newsList = news.slice(FEATURED_COUNT);

    const hasMoreNews =
        latestNews.items.length > HOMEPAGE_LIMIT;

    return (
        <Section className="border-b border-slate-200/60 bg-white">
            <Container>
                <SectionHeading
                    title={latestNews.title}
                    subtitle={latestNews.subtitle}
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    className="mt-14 grid grid-cols-1 items-start gap-10 xl:grid-cols-[1.45fr_1fr]"
                >
                    <div className="flex flex-col gap-8">
                        {featuredNews.map((item) => (
                            <FeaturedNewsCard
                                key={item.id}
                                news={item}
                            />
                        ))}
                    </div>

                    <div className="border-slate-200 xl:border-l xl:pl-8">
                        <div className="flex flex-col gap-5 xl:sticky xl:top-28">
                            {newsList.map((item) => (
                                <NewsListItem
                                    key={item.id}
                                    news={item}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {hasMoreNews && (
                    <div className="mt-14 flex justify-center">
                        <Link
                            to="/news"
                            className="group inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 transition-all duration-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                            View All News

                            <ArrowRight
                                size={16}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                )}
            </Container>
        </Section>
    );
}