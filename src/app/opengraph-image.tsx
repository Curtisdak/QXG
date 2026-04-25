import { ImageResponse } from "next/og";

export const alt = "QXG - Jeu adulte action ou verite";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 50% 35%, #ff995c 0%, #bf5a8e 45%, #1e0a57 78%, #03030a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02) 45%, rgba(0,0,0,0.2))",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 138,
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: 6,
            }}
          >
            QXG
          </div>
          <div
            style={{
              fontSize: 42,
              lineHeight: 1.15,
              opacity: 0.96,
            }}
          >
            Jeu adulte 18+ - Action ou verite - Soiree privee
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

