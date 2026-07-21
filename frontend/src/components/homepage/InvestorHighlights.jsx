import { motion } from "framer-motion";
import { Landmark, TrendingUp, Zap, Building2 } from "lucide-react";

import Container from "../ui/Container";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";

const HOMEPAGE_LIMIT = 5;

const iconMap = {
  Revenue: Landmark,
  "Net Profit": TrendingUp,
  "Installed Capacity": Zap,
  "Power Stations": Building2,
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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = iconMap[item.metric] || Landmark;
            const displayValue = `${item.value} ${item.unit}`;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-slate-200">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 mb-4">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{displayValue}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.metric}</p>
                  <p className="mt-1 text-xs text-slate-500">FY {item.financialYear}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {investorHighlights.items.length > HOMEPAGE_LIMIT && (
          <div className="mt-10 flex justify-center">
            <a
              href="/investors"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-all duration-300 hover:border-blue-700 hover:bg-blue-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              View All Investor Resources
            </a>
          </div>
        )}
      </Container>
    </Section>
  );
}