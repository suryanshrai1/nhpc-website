import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  MapPin,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../ui/Container";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";

const HOMEPAGE_LIMIT = 5;

export default function OperationalStations({ operationalStations }) {
  if (
    !operationalStations ||
    !operationalStations.isVisible ||
    !operationalStations.items?.length
  ) {
    return null;
  }

  const stations = operationalStations.items.slice(0, HOMEPAGE_LIMIT);

  const totalCapacity = operationalStations.items.reduce(
    (sum, station) => sum + station.installedCapacity,
    0
  );

  const statesCovered = new Set(
    operationalStations.items.map((s) => s.state)
  ).size;

  const hasMoreStations =
    operationalStations.items.length > HOMEPAGE_LIMIT;

  return (
    <Section className="border-b border-slate-200/60 bg-slate-50">
      <Container>

        <SectionHeading
          title={operationalStations.title}
          subtitle={operationalStations.subtitle}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12">

          {/* Left Dashboard */}

          <div className="lg:col-span-4">

            <div className="rounded-3xl bg-blue-900 p-8 text-white">

              <h3 className="text-2xl font-bold">
                NHPC Operations
              </h3>

              <div className="mt-10 space-y-8">

                <div className="flex items-center gap-4">
                  <Zap className="text-yellow-300" />
                  <div>
                    <p className="text-3xl font-bold">
                      {totalCapacity} MW
                    </p>
                    <p className="text-blue-100">
                      Installed Capacity
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <MapPin className="text-green-300" />
                  <div>
                    <p className="text-3xl font-bold">
                      {statesCovered}
                    </p>
                    <p className="text-blue-100">
                      States Covered
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Building2 className="text-orange-300" />
                  <div>
                    <p className="text-3xl font-bold">
                      {operationalStations.items.length}
                    </p>
                    <p className="text-blue-100">
                      Operational Stations
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Right List */}

          <div className="lg:col-span-8">

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              {stations.map((station, index) => (

                <Link
                  key={station.id}
                  to={`/stations/${station.slug}`}
                  className={`group flex flex-col gap-4 p-6 transition hover:bg-slate-50 md:flex-row md:items-center ${
                    index !== stations.length - 1
                      ? "border-b border-slate-200"
                      : ""
                  }`}
                >

                  <div className="flex-1">

                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-700">
                      {station.name}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-3">

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">
                        {station.state}
                      </span>

                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700">
                        {station.type}
                      </span>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-2xl font-bold text-slate-900">
                      {station.installedCapacity} MW
                    </p>

                    <ArrowRight className="ml-auto mt-2 transition group-hover:translate-x-1" />

                  </div>

                </Link>

              ))}

            </div>

            {hasMoreStations && (
              <div className="mt-10 flex justify-center">

                <Link
                  to="/stations"
                  className="group inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-blue-700 hover:bg-blue-700 hover:text-white"
                >
                  View All Stations

                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
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