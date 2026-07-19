import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Globe,
  Leaf,
  Recycle,
  Users,
} from "lucide-react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import Container from "../ui/Container";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";

const HOMEPAGE_LIMIT = 4;

const iconMap = {
  "Renewable Energy": Leaf,
  Environment: Globe,
  "Community Development": Users,
  Biodiversity: Recycle,
};

export default function Sustainability({ sustainability }) {
  if (
    !sustainability ||
    !sustainability.isVisible ||
    !sustainability.items?.length
  ) {
    return null;
  }

  const displayItems = sustainability.items.slice(0, HOMEPAGE_LIMIT);

  const hasMoreItems =
    sustainability.items.length > HOMEPAGE_LIMIT;

  return (
    <Section className="border-b border-slate-200/60 bg-slate-50">
      <Container>
        <SectionHeading
          title={sustainability.title}
          subtitle={sustainability.subtitle}
        />

        <div className="mt-14 grid gap-16 lg:grid-cols-12">

          {/* Left Panel */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-fit lg:sticky lg:top-28 lg:col-span-4"
          >
            <div className="rounded-3xl bg-gradient-to-br from-blue-700 to-blue-900 p-10 text-white shadow-xl">

              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
                <Leaf size={34} />
              </div>

              <h3 className="text-3xl font-bold">
                Building A Greener Future
              </h3>

              <p className="mt-5 leading-8 text-blue-100">
                NHPC continues to advance clean energy generation while
                protecting biodiversity, empowering communities and
                contributing towards India's sustainable future.
              </p>

              <Link
                to="/sustainability"
                className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-blue-700 transition-all duration-300 hover:gap-3"
              >
                Explore Sustainability

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

            </div>
          </motion.div>

          {/* Timeline */}

          <div className="relative lg:col-span-8">

            <div className="absolute bottom-0 left-5 top-0 w-px bg-slate-200" />

            <div className="space-y-10">

              {displayItems.map((item, index) => {

                const Icon = iconMap[item.type] || Leaf;

                return (
                  <motion.div
                    key={item.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    className="relative flex gap-6"
                  >

                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white bg-emerald-500 shadow">
                      <Icon
                        size={18}
                        className="text-white"
                      />
                    </div>

                    <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">

                      <div className="flex flex-wrap items-center gap-3">

                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          {item.type}
                        </span>

                        <div className="flex items-center gap-2 text-sm text-slate-500">

                          <CalendarDays size={15} />

                          {dayjs(item.publishedAt).format("DD MMM YYYY")}

                        </div>

                      </div>

                      <h3 className="mt-4 text-2xl font-semibold text-slate-900">
                        {item.title}
                      </h3>

                      <p className="mt-3 leading-7 text-slate-600">
                        {item.summary}
                      </p>

                      <Link
                        to={`/sustainability/${item.slug}`}
                        className="mt-5 inline-flex items-center gap-2 font-medium text-blue-600 transition-all duration-300 hover:gap-3"
                      >
                        Learn More

                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </Link>

                    </div>

                  </motion.div>
                );
              })}

            </div>

            {hasMoreItems && (
              <div className="mt-12 flex justify-center">

                <Link
                  to="/sustainability"
                  className="group inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-blue-700 hover:bg-blue-700 hover:text-white"
                >
                  View All Initiatives

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

              </div>
            )}

          </div>

        </div>
      </Container>
    </Section>
  );
}