"use client";

import NavBar from "@/app/components/NavBar";
import { useState } from "react";

export default function Home() {
  const [tokens, setTokens] = useState<string[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  return (
    <div className="h-[100vh]">
      <NavBar />

      <input
        value={userId}
        placeholder="userID"
        className="border border-1"
        onChange={(e) => setUserId(e.target.value)}
      ></input>
      <input
        value={question}
        placeholder="질문하기"
        className="border border-1"
        onChange={(e) => setQuestion(e.target.value)}
      ></input>

      <button
        className="bg-yellow-500 mt-20 ml-20 w-12 h-12"
        onClick={async () => {
          const res = await fetch(
            "https://3.38.128.30.nip.io/langchain/stream",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: "99",
                content: question,
              }),
            }
          );
          setQuestion("");

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
                setTokens((prev) => [...prev, parsed.token]);
              } catch (e) {
                console.error("JSON 파싱 에러:", e, trimmed);
              }
            }
          }
        }}
      >
        call api
      </button>

      <div className="mt-10">답변:</div>
      <div>
        {tokens.map((token, idx) => (
          <span key={idx}>{token}</span>
        ))}
      </div>
    </div>
  );
}
