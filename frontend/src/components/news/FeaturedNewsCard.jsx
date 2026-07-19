import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import Badge from "../ui/Badge";
import Card from "../ui/Card";

export default function FeaturedNewsCard({ news }) {
    if (!news) return null;

    return (
        <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="space-y-5 p-7">

                {news.category && (
                    <Badge>
                        {news.category}
                    </Badge>
                )}

                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays size={16} />

                    <span>
                        {dayjs(news.publishedAt).format("DD MMM YYYY")}
                    </span>
                </div>

                <h3 className="text-2xl font-bold leading-tight text-slate-900">
                    {news.title}
                </h3>

            <p className="line-clamp-3 text-base leading-7 text-slate-600">
                    {news.summary}
                </p>

                <Link
                    to={`/news/${news.slug}`}
                    className="inline-flex items-center gap-2 font-semibold text-blue-600 transition-all hover:gap-3 hover:text-blue-700"
                >
                    Read More

                    <ArrowRight size={18} />
                </Link>

            </div>
        </Card>
    );
}