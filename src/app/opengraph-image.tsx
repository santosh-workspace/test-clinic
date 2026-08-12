import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card, generated at build time.
 *
 * TODO: once a real photo of the hospital front exists, a photographic card
 * generally outperforms a typographic one for local businesses. Swap by
 * replacing this file with a static /public/images/og-image.jpg reference.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#04121e",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -140,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: "rgba(20,84,214,0.42)",
            filter: "blur(140px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -240,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "rgba(13,156,138,0.34)",
            filter: "blur(140px)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="44" stroke="#52d4c0" strokeWidth="4" />
            <circle cx="50" cy="50" r="7" fill="#52d4c0" />
            <path d="M28 27 L50 50" stroke="#88b8ff" strokeWidth="7" strokeLinecap="round" />
            <path d="M72 27 L50 50" stroke="#88b8ff" strokeWidth="7" strokeLinecap="round" />
            <path d="M50 50 L50 75" stroke="#88b8ff" strokeWidth="7" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "white", fontSize: 34, fontWeight: 700 }}>
              {siteConfig.name}
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: 18,
                letterSpacing: 4,
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              {siteConfig.tagline}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "white",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              maxWidth: 900,
            }}
          >
            Specialist care for small eyes and small people.
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.62)",
              fontSize: 28,
              marginTop: 26,
            }}
          >
            Paediatrics &amp; Ophthalmology · {siteConfig.city}
          </span>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Newborn Care", "Vaccination", "Eye Examination", "Cataract"].map((tag) => (
            <span
              key={tag}
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: 21,
                padding: "12px 24px",
                borderRadius: 9999,
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
