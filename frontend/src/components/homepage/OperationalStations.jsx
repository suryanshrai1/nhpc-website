import { useMemo, useState } from "react";
import { ArrowRight, Building2, MapPin, Zap } from "lucide-react";
import { Link } from "react-router-dom";

import Section from "../ui/Section";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

import IndiaMap from "./IndiaMap";

const HOMEPAGE_LIMIT = 5;

export default function OperationalStations({ operationalStations }) {
  if (
    !operationalStations ||
    !operationalStations.isVisible ||
    !operationalStations.items?.length
  ) {
    return null;
  }

  const stations = useMemo(
    () => operationalStations.items.slice(0, HOMEPAGE_LIMIT),
    [operationalStations]
  );

  const [selectedStation, setSelectedStation] = useState(stations[0]);

  const totalCapacity = operationalStations.items.reduce(
    (sum, station) => sum + Number(station.installedCapacity || 0),
    0
  );

  const statesCovered = new Set(
    operationalStations.items.map((s) => s.state.id)
  ).size;

  const hasMoreStations =
    operationalStations.items.length > HOMEPAGE_LIMIT;

  return (
    <Section className="border-b border-slate-200 bg-slate-50">

      <Container>

        <SectionHeading
          title={operationalStations.title}
          subtitle={operationalStations.subtitle}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12 items-start">

          {/* LEFT */}

          <div className="xl:col-span-5 space-y-6">

            <IndiaMap
              stations={stations}
              selectedStation={selectedStation}
              setSelectedStation={setSelectedStation}
            />

            <div className="grid grid-cols-3 gap-4">

              <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">

                <Zap className="text-blue-700" size={24} />

                <p className="mt-3 text-2xl font-bold">
                  {totalCapacity}
                </p>

                <p className="text-sm text-slate-500">
                  MW Capacity
                </p>

              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">

                <MapPin className="text-blue-700" size={24} />

                <p className="mt-3 text-2xl font-bold">
                  {statesCovered}
                </p>

                <p className="text-sm text-slate-500">
                  States
                </p>

              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">

                <Building2 className="text-blue-700" size={24} />

                <p className="mt-3 text-2xl font-bold">
                  {operationalStations.items.length}
                </p>

                <p className="text-sm text-slate-500">
                  Stations
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="xl:col-span-7">

            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">

              <div className="border-b border-slate-200 p-6">

                <h3 className="text-2xl font-bold">
                  {selectedStation.name}
                </h3>

                <div className="mt-3 flex flex-wrap gap-3">

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">

                    {selectedStation.state.name}

                  </span>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">

                    {selectedStation.projectType.name}

                  </span>

                  <span className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700">

                    {selectedStation.installedCapacity} MW

                  </span>

                </div>

              </div>

              {stations.map((station, index) => (

                <Link
                  key={station.id}
                  to={`/stations/${station.slug}`}
                  onMouseEnter={() => setSelectedStation(station)}
                  className={`group flex items-center justify-between p-6 hover:bg-slate-50 transition ${
                    index !== stations.length - 1
                      ? "border-b border-slate-200"
                      : ""
                  }`}
                >

                  <div>

                    <h4 className="font-semibold text-lg group-hover:text-blue-700">

                      {station.name}

                    </h4>

                    <p className="mt-1 text-sm text-slate-500">

                      {station.state.name}

                    </p>

                  </div>

                  <div className="flex items-center gap-6">

                    <div className="text-right">

                      <p className="font-bold">

                        {station.installedCapacity} MW

                      </p>

                      <p className="text-sm text-slate-500">

                        {station.projectType.name}

                      </p>

                    </div>

                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />

                  </div>

                </Link>

              ))}

            </div>

            {hasMoreStations && (

              <div className="mt-8 flex justify-center">

                <Link
                  to="/stations"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                >

                  View All Stations

                  <ArrowRight size={18} />

                </Link>

              </div>

            )}

          </div>

        </div>

      </Container>

    </Section>
  );
}