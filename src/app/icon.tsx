import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** Favicon / app icon — the YH monogram on brand gradient. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1454d6 0%, #2a6ff0 55%, #22b9a5 100%)",
          borderRadius: 112,
        }}
      >
        <svg width="330" height="330" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="44" stroke="white" strokeWidth="4" opacity="0.55" />
          <circle cx="50" cy="50" r="13" fill="white" opacity="0.3" />
          <circle cx="50" cy="50" r="6.5" fill="white" />
          <path d="M28 27 L50 50" stroke="white" strokeWidth="7.5" strokeLinecap="round" />
          <path d="M72 27 L50 50" stroke="white" strokeWidth="7.5" strokeLinecap="round" />
          <path d="M50 50 L50 75" stroke="white" strokeWidth="7.5" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
