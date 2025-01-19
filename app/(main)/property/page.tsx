"use client";

import MapContainer from "@/app/components/MapContainer";
import NavBar from "@/app/components/NavBar";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { ask } from "./actions";
import MultilineText from "@/app/components/MultilineText";
import TypingText from "@/app/components/TypingText";
import { Property } from "@/app/types/property";
import PropertyList from "@/app/components/PropertyList";

export default function Home() {
  const [state, dispatch, isPending] = useActionState(ask, null);

  const [questionInput, setQuestionInput] = useState<string>("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);

  const [showPropertyList, setShowPropertyList] = useState<boolean>(true);
  // const [showPropertyDetail, setShowPropertyDetail] = useState<boolean>(true);

  useEffect(() => {
    if (state?.answer) {
      setAnswers((prev) => [...prev, state?.answer as string]);
    }
    if (state?.properties) {
      setProperties(state?.properties);
    }
  }, [state]);

  return (
    <div className="h-[100vh]">
      <NavBar />

      <div className="flex flex-row h-full w-full pt-[72px]">
        <PropertyList
          properties={properties}
          showPropertyList={showPropertyList}
          setShowPropertyList={setShowPropertyList}
        />

        <div className="w-full h-full">
          <MapContainer />
        </div>

        <div className="min-w-[432px] max-w-[432px] h-full flex flex-col px-4 pb-6">
          {questions.length || answers.length ? (
            <div className="h-full flex flex-col overflow-y-scroll pb-4">
              {questions.map((question, idx) => (
                <div key={idx}>
                  <div className="bg-[#F2F2F7] px-4 py-2 text-base font-medium rounded-b-3xl rounded-tl-3xl rounded-tr ml-auto mt-4 max-w-[385px] text-right size-fit">
                    <MultilineText text={question} />
                  </div>
                  <div className="flex flex-row mr-auto mt-4 gap-2 justify-start items-start">
                    <Image
                      src="/logo-ai.svg"
                      width={36}
                      height={36}
                      alt="ai chatbot"
                    />
                    <div className="border-[1px] border-[#CABBE6] px-4 py-2 text-base font-medium rounded-b-3xl rounded-tr-3xl rounded-tl size-fit min-w-48">
                      {answers[idx] ? <TypingText text={answers[idx]} /> : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center items-center gap-4">
              <Image
                src="/logo-ai.svg"
                width={54}
                height={54}
                alt="ai chatbot"
              />
              <div className="font-bold text-2xl text-[#2D125F]">
                Release 매물 비서
              </div>
              <div className="shadow-md rounded-[32px] p-[10px] text-center text-base font-medium text-[#645B75] w-[363px] h-[103px] items-center">
                안녕하세요! 🏢
                <br />
                원하는 상업용 매물을 찾아주는 릴리스 AI 비서입니다!
                <br />
                생각하고 계신 지역이나 예산, 조건 등을 말씀해주세요
              </div>
            </div>
          )}

          <div className="gap-1 flex flex-col">
            <div className="relative">
              <form action={dispatch}>
                <textarea
                  placeholder="릴리스 AI 비서에게 물어보기"
                  name="question"
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  className="bg-[#EFEFEF] w-full h-auto max-h-14 rounded-full outline-none pl-6 pr-12 py-4 resize-none overflow-hidden"
                ></textarea>
                <button
                  disabled={isPending || !questionInput.length}
                  onClick={() => {
                    setQuestions((prev) => [...prev, questionInput]);
                    setShowPropertyList(true);
                    setTimeout(() => setQuestionInput(""), 0.1);
                  }}
                >
                  <Image
                    src="/btn-textarea-submit.svg"
                    width={40}
                    height={40}
                    alt="submit"
                    className="absolute top-2 right-2 cursor-pointer"
                  />
                </button>
              </form>
            </div>

            <div className="text-xs text-[#645B75] text-center">
              릴리스 비서는 실수를 할 수 있습니다. 원하는 매물 정보를 정확히
              입력하세요.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
