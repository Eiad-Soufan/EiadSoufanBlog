import {
  animate,
  motion as Motion,
  useInView,
} from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { impactMetrics } from "../data/profile";
import useHydrationSafeReducedMotion from "../hooks/useHydrationSafeReducedMotion";
import { useLocale } from "../i18n/LocaleContext";

function AnimatedMetricValue({ value, suffix, index, start, reduceMotion, formatter }) {
  const valueRef = useRef(null);
  const finalText = `${formatter.format(value)}${suffix}`;

  useEffect(() => {
    const valueNode = valueRef.current;
    if (!valueNode) return undefined;

    valueNode.textContent = finalText;

    if (!start || reduceMotion) return undefined;

    valueNode.textContent = `0${suffix}`;
    const controls = animate(0, value, {
      duration: 1.35,
      delay: index * 0.09,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        valueNode.textContent = `${formatter.format(Math.round(latest))}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [finalText, formatter, index, reduceMotion, start, suffix, value]);

  return (
    <>
      <span ref={valueRef} aria-hidden="true">
        {finalText}
      </span>
      <span className="sr-only">{finalText}</span>
    </>
  );
}

export default function ImpactMetrics() {
  const reduceMotion = useHydrationSafeReducedMotion();
  const metricsRef = useRef(null);
  const metricsInView = useInView(metricsRef, { once: true, amount: 0.3 });
  const { copy, localeMeta } = useLocale();
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(localeMeta.intl, { maximumFractionDigits: 0 }),
    [localeMeta.intl],
  );

  return (
    <Motion.dl
      ref={metricsRef}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.62, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
      className="impact-metrics relative mt-12 grid grid-cols-2 overflow-hidden rounded-[22px] border border-line/15 bg-surface/45 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.035)] backdrop-blur-sm lg:mt-16 lg:grid-cols-4"
      aria-label={copy.profile.metricsAria}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan/45 to-transparent"
      />
      {impactMetrics.map((metric, index) => (
        <div
          key={index}
          className={`impact-metric relative flex min-h-[124px] min-w-0 flex-col justify-center px-5 py-6 sm:px-7 lg:min-h-[136px] ${
            index % 2 === 0 ? "border-e border-line/10" : ""
          } ${index < 2 ? "border-b border-line/10 lg:border-b-0" : ""} ${
            index === 1 ? "lg:border-e" : ""
          } ${index === 2 ? "lg:border-e" : ""}`}
        >
          <dt className="order-2 mt-2 max-w-[15rem] text-[0.72rem] font-semibold leading-relaxed tracking-[0.01em] text-muted sm:text-xs">
            {copy.profile.metrics[index]}
          </dt>
          <dd
            className="display-font order-1 text-[clamp(1.55rem,3vw,2.35rem)] font-bold tracking-[-0.045em] text-ink"
            dir="ltr"
          >
            <AnimatedMetricValue
              value={metric.value}
              suffix={metric.suffix}
              index={index}
              start={metricsInView}
              reduceMotion={reduceMotion}
              formatter={numberFormatter}
            />
          </dd>
        </div>
      ))}
    </Motion.dl>
  );
}
