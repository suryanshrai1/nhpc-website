import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function NewsListItem({ news }) {
    if (!news) return null;

    return (
        <Link
            to={`/news/${news.slug}`}
            className="group block rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-blue-200 hover:shadow-md"
        >
            <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
                <CalendarDays size={15} />

                <span>
                    {dayjs(news.publishedAt).format("DD MMM YYYY")}
                </span>
            </div>

            <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {news.category}
            </span>

            <h4 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                {news.title}
            </h4>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                {news.summary}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600">
                Read More

                <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                />
            </div>
        </Link>
    );
}