import { motion } from "framer-motion";
import IndiaSvg from "../../assets/india.svg";

const INDIA = {
  minLat: 6.5,
  maxLat: 37.5,
  minLng: 68,
  maxLng: 97.5,
};

// These values are calibrated for the SVG.
// You may tweak them by 1–2% after viewing.
const MAP = {
  left: 12,
  right: 88,
  top: 8,
  bottom: 92,
};

function project(lat, lng) {
  const x =
    MAP.left +
    ((lng - INDIA.minLng) / (INDIA.maxLng - INDIA.minLng)) *
      (MAP.right - MAP.left);

  const y =
    MAP.top +
    ((INDIA.maxLat - lat) / (INDIA.maxLat - INDIA.minLat)) *
      (MAP.bottom - MAP.top);

  return { x, y };
}

export default function IndiaMap({
  stations,
  selectedStation,
  setSelectedStation,
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
      <img
        src={IndiaSvg}
        alt="India"
        className="mx-auto w-[105%] h-auto"
        draggable={false}
      />

      {stations.map((station) => {
        const { x, y } = project(station.latitude, station.longitude);

        const active = selectedStation?.id === station.id;

        return (
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
          >
            {active && (
              <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-60" />
            )}

            <motion.button
              whileHover={{ scale: 1.3 }}
              animate={{
                scale: active ? 1.3 : 1,
              }}
              className={`relative rounded-full border-2 border-white shadow-lg transition
        ${active ? "bg-blue-700 w-5 h-5" : "bg-blue-400 w-3.5 h-3.5"}`}
              onMouseEnter={() => setSelectedStation(station)}
            />
          </div>
        );
      })}
    </div>
  );
}
