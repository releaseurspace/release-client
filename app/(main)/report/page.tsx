"use client";

import NavBar from "@/app/components/NavBar";

export default function Home() {
  return (
    <div className="h-[100vh]">
      <NavBar />

      <button
        className="bg-yellow-500 mt-20 ml-20 w-24 h-24"
        onClick={async () => {
          const res = await fetch(
            "https://3.38.128.30.nip.io/langchain/stream",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: "1",
                content: "안녕! 성수쪽에서 매물 찾아줘",
              }),
            }
          );

          console.log("requested");

          console.log(res);

          const resData = await res.json();
          console.log(resData);

          const reader = res
            .body!.pipeThrough(new TextDecoderStream())
            .getReader();

          while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            // 한 번에 여러 줄이 담겨올 수 있으므로 split
            const lines = value.split("\n");
            for (const line of lines) {
              const trimmed = line.trim();
              // 빈 줄이면 무시
              if (!trimmed) continue;
              try {
                const parsed = JSON.parse(trimmed);
                console.log(parsed);
              } catch (e) {
                console.error("JSON 파싱 에러:", e, trimmed);
              }
            }
          }
        }}
      >
        call api
      </button>
      <div className="flex flex-row gap-8">
        <div style={{ width: 78, height: 64, position: "relative" }}>
          <div
            style={{
              width: 22,
              color: "#885AFF",
              fontSize: 8,
              fontWeight: 600,
              top: 5,
              left: 28,
              position: "absolute",
              zIndex: 10,
            }}
          >
            서울시
          </div>
          <div
            style={{
              display: "flex",
              width: "48px",
              height: "18px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              flexShrink: "0",
              borderRadius: "46px",
              border: "1px solid #885AFF",
              backgroundColor: "#FFF",
              color: "#121212",
              textAlign: "center",
              fontSize: 12,
              fontWeight: 600,
              position: "absolute",
              zIndex: 10,
              top: 20,
              left: 15.5,
            }}
          >
            동작구
          </div>
          <svg
            style={{ position: "absolute" }}
            xmlns="http://www.w3.org/2000/svg"
            width="78"
            height="64"
            viewBox="0 0 78 64"
            fill="none"
          >
            <g filter="url(#filter0_d_830_5991)">
              <path
                d="M39.433 55.25C39.2406 55.5833 38.7594 55.5833 38.567 55.25L34.2369 47.75C34.0444 47.4167 34.285 47 34.6699 47L43.3301 47C43.715 47 43.9556 47.4167 43.7631 47.75L39.433 55.25Z"
                fill="#F2F2F7"
                stroke="#885AFF"
              />
              <rect
                x="4.5"
                y="0.5"
                width="69"
                height="47"
                rx="15.5"
                fill="#F2F2F7"
                stroke="#885AFF"
              />
              <path
                d="M35.2676 47.5L34.9343 47H43.0657L42.7324 47.5H35.2676Z"
                stroke="#F2F2F7"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_830_5991"
                x="0"
                y="0"
                width="78"
                height="64"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_830_5991"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_830_5991"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>

        <div style={{ width: 70, height: 55, position: "relative" }}>
          <div
            style={{
              width: 22,
              color: "#FFF",
              fontSize: 8,
              fontWeight: 600,
              top: 5,
              left: 24.5,
              position: "absolute",
              zIndex: 10,
            }}
          >
            서울시
          </div>
          <div
            style={{
              display: "flex",
              width: "48px",
              height: "18px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              flexShrink: "0",
              borderRadius: "46px",
              border: "1px solid #885AFF",
              backgroundColor: "#FFF",
              color: "#121212",
              textAlign: "center",
              fontSize: 12,
              fontWeight: 600,
              position: "absolute",
              zIndex: 10,
              top: 20,
              left: 11.5,
            }}
          >
            동작구
          </div>
          <svg
            style={{ position: "absolute", zIndex: 0 }}
            width="70"
            height="55"
            viewBox="0 0 70 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M35.866 54.5C35.4811 55.1667 34.5189 55.1667 34.134 54.5L29.8038 47C29.4189 46.3333 29.9001 45.5 30.6699 45.5L39.3301 45.5C40.0999 45.5 40.5811 46.3333 40.1962 47L35.866 54.5Z"
              fill="#885AFF"
            />
            <rect
              x="0.5"
              y="0.5"
              width="69"
              height="47"
              rx="15.5"
              fill="#885AFF"
              stroke="#885AFF"
            />
          </svg>
        </div>

        <div
          style={{
            position: "relative",
            width: 70,
            height: 48,
            borderRadius: 16,
            border: 1,
            borderColor: "#885AFF",
            backgroundColor: "#885AFF",
            justifyItems: "center",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <div
            style={{
              color: "#FFF",
              fontSize: 8,
              fontWeight: 600,
              top: 1,
            }}
          >
            서울시
          </div>
          <div
            style={{
              display: "flex",
              width: "48px",
              height: "18px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              flexShrink: "0",
              borderRadius: "46px",
              border: "1px solid #885AFF",
              backgroundColor: "#FFF",
              color: "#121212",
              textAlign: "center",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            동작구
          </div>
          <svg
            style={{ position: "absolute", top: 46.5, left: 29 }}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
          >
            <path
              d="M6.86603 9.5C6.48113 10.1667 5.51887 10.1667 5.13397 9.5L0.803848 2C0.418948 1.33333 0.900074 0.499999 1.66987 0.499999L10.3301 0.5C11.0999 0.5 11.5811 1.33333 11.1962 2L6.86603 9.5Z"
              fill="#885AFF"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
