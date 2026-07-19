import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  FileText,
  Landmark,
  PieChart,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import Container from "../ui/Container";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";

const HOMEPAGE_LIMIT = 5;

const iconMap = {
  Reports: FileText,
  Governance: ShieldCheck,
  Finance: Landmark,
  Shareholding: PieChart,
};

export default function InvestorHighlights({ investorHighlights }) {
  if (
    !investorHighlights ||
    !investorHighlights.isVisible ||
    !investorHighlights.items?.length
  ) {
    return null;
  }

  const items = investorHighlights.items.slice(0, HOMEPAGE_LIMIT);

  return (
    <Section className="border-b border-slate-200/60 bg-white">
      <Container>

        <SectionHeading
          title={investorHighlights.title}
          subtitle={investorHighlights.subtitle}
        />

        <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {items.map((item, index) => {

            const Icon = iconMap[item.type] || FileText;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  to={`/investors/${item.slug}`}
                  className={`group flex flex-col gap-5 p-7 transition hover:bg-slate-50 md:flex-row md:items-center ${
                    index !== items.length - 1
                      ? "border-b border-slate-200"
                      : ""
                  }`}
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon size={28} />
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {item.type}
                      </span>

                      <span className="flex items-center gap-2 text-sm text-slate-500">
                        <CalendarDays size={14} />
                        {dayjs(item.publishedAt).format("DD MMM YYYY")}
                      </span>

                    </div>

                    <h3 className="mt-3 text-xl font-semibold text-slate-900 transition-colors group-hover:text-blue-700">
                      {item.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-slate-600">
                      {item.summary}
                    </p>

                  </div>

                  <ArrowRight
                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-2"
                    size={22}
                  />
                </Link>
              </motion.div>
            );
          })}

        </div>

        {investorHighlights.items.length > HOMEPAGE_LIMIT && (
          <div className="mt-10 flex justify-center">

            <Link
              to="/investors"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-all duration-300 hover:border-blue-700 hover:bg-blue-700 hover:text-white"
            >
              View All Investor Resources

              <ArrowRight size={18} />
            </Link>

          </div>
        )}

      </Container>
    </Section>
  );
}