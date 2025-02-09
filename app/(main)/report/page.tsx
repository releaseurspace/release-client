"use client";

import NavBar from "@/app/components/NavBar";
import { useState } from "react";

export default function Home() {
  const [mainProperties, setMainProperties] = useState([]);
  const [subProperties, setSubProperties] = useState([]);
  const [tokens, setTokens] = useState<string[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  return (
    <div className="h-[100vh]">
      <NavBar />

      <input
        value={userId}
        placeholder="userID"
        className="border"
        onChange={(e) => setUserId(e.target.value)}
      ></input>
      <input
        value={question}
        placeholder="질문하기"
        className="border border-1"
        onChange={(e) => setQuestion(e.target.value)}
      ></input>

      <button
        className="mt-20 ml-6 border-2 rounded-lg px-3 bg-slate-300"
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

          console.log("res", res);
          // const resData = await res.json()
          // console.log(resData)

          const reader = res
            .body!.pipeThrough(new TextDecoderStream())
            .getReader();

          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            console.log("value",value)

            const lines = value.split("\n");
            console.log("lines", lines)
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed) continue;
              try {
                // console.log(trimmed);
                const parsed = JSON.parse(trimmed);
                // console.log("parsed", parsed);
                if (parsed.mainProperties) {
                  setMainProperties(parsed.mainProperties);
                }
                if (parsed.subProperties) {
                  setSubProperties(parsed.subProperties);
                } else {
                  setTokens((prev) => [...prev, parsed.token]);
                }
              } catch (e) {
                console.error("JSON 파싱 에러:", e, trimmed);
              }
            }
          }
        }}
      >
        call api
      </button>

      <div className="mt-10"></div>
      <div>
        mainProperties: <br />
        {mainProperties.toString()}
      </div>
      <div>
        subProperties: <br />
        {subProperties.toString()}
      </div>
      <div className="mt-10">답변:</div>
      <div>
        {tokens.map((token, idx) => (
          <span key={idx}>{token}</span>
        ))}
      </div>
    </div>
  );
}
