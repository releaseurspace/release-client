"use client";

import NavBar from "@/app/components/NavBar";
import callAPI from "@/app/util/call-api";
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
          console.log("start", Date.now());
          const chatbotRes = await callAPI({
            url: process.env.NEXT_PUBLIC_SERVER_URL + "/langchain/stream",
            method: "POST",
            isPrivate: false,
            body: {
              userId,
              content: question,
            },
          });
          setQuestion("");

          const reader = chatbotRes
            .body!.pipeThrough(new TextDecoderStream())
            .getReader();

          if (reader) {
            console.log(Date.now());
            const propertiesRes = await (
              await callAPI({
                url:
                  process.env.NEXT_PUBLIC_SERVER_URL +
                  "/langchain/properties" +
                  "?userId=" +
                  userId,
                method: "GET",
                isPrivate: false,
              })
            ).json();

            console.log(propertiesRes);
          }

          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            console.log("value", value);

            const lines = value.split("\n");
            // console.log("lines", lines)
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
        {mainProperties}
      </div>
      <div>
        subProperties: <br />
        {subProperties}
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
