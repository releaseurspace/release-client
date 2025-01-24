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

          const reader = res.body!
            .pipeThrough(new TextDecoderStream())
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
    </div>
  );
}
