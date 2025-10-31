"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import CountUp from "react-countup";

interface StatCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

export default function StatCounter({
  end,
  suffix = "",
  prefix = "",
  label,
  duration = 2,
}: StatCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center">
      <div className="mb-2 text-4xl font-bold text-gray-900 md:text-5xl">
        {isInView && (
          <CountUp
            start={0}
            end={end}
            duration={duration}
            prefix={prefix}
            suffix={suffix}
          />
        )}
      </div>
      <p className="text-sm font-medium text-gray-600 md:text-base">{label}</p>
    </div>
  );
}
