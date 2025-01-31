"use client";

import NavBar from "@/app/components/NavBar";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { ask } from "./actions";
import MultilineText from "@/app/components/MultilineText";
import TypingText from "@/app/components/TypingText";
import { Property } from "@/app/types/property";
import PropertyList from "@/app/components/PropertyList";
import AutoScrollDiv from "@/app/components/AutoScrollDiv";
import Map from "@/app/components/Map";
import { threePropertyIds } from "@/app/types/topThreePropertyIds";

export default function Home() {
  const [state, dispatch, isPending] = useActionState(ask, null);

  const [questionInput, setQuestionInput] = useState<string>("");
  const [promptLines, setPromptLines] = useState<number>(1);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [threePropertyIds, setThreePropertyIds] = useState<threePropertyIds>();

  const [showPropertyList, setShowPropertyList] = useState<boolean>(true);
  const [focusedPropertyId, setFocusedPropertyId] = useState<number | null>(
    null
  );

  const [username, setUsername] = useState<string>("");

  function chatbotSumbit() {
    const formData = new FormData();
    formData.append("question", questionInput);
    formData.append("username", username);

    dispatch(formData);
  }

  useEffect(() => {
    if (state?.answer) {
      setAnswers((prev) => [...prev, state?.answer as string]);
    }
    if (state?.properties) {
      setProperties(state?.properties);
      setFocusedPropertyId(null);

      const top3 = {} as threePropertyIds;
      top3[1] = state?.properties[0]?.id;
      top3[2] = state?.properties[1]?.id;
      top3[3] = state?.properties[2]?.id;

      setThreePropertyIds(top3);
    }
  }, [state]);

  return (
    <div className="h-[100vh]">
      <NavBar />

      <div className="flex flex-row h-full w-full pt-[56px]">
        {properties.length > 0 ? (
          <div
            className="fixed top-24 w-[58px] h-[66px] bg-white rounded-r-[17px] z-20 shadow-xl flex justify-center items-center cursor-pointer"
            onClick={() => setShowPropertyList(true)}
          >
            <Image
              src="/btn-sidebar.svg"
              width={22}
              height={26}
              alt="ai chatbot"
            />
          </div>
        ) : null}

        <PropertyList
          properties={properties}
          showPropertyList={showPropertyList}
          setShowPropertyList={setShowPropertyList}
          focusedPropertyId={focusedPropertyId}
          setFocusedPropertyId={setFocusedPropertyId}
        />

        <div className="w-full h-full">
          <Map
            threePropertyIds={threePropertyIds}
            markerData={properties.map((property) => {
              return {
                id: property.id,
                lat: +property.latitude,
                lng: +property.longitude,
                monthly_rent: property.monthly_rent,
                deposit: property.deposit,
              };
            })}
            focusedPropertyId={focusedPropertyId}
            setShowPropertyList={setShowPropertyList}
            setFocusedPropertyId={setFocusedPropertyId}
          />
        </div>

        <div className="min-w-[432px] max-w-[432px] h-full flex flex-col px-4 pb-6">
          {questions.length || answers.length ? (
            <div className="h-full flex flex-col overflow-y-scroll pb-4 scrollbar-hide">
              <AutoScrollDiv>
                {questions.map((question, idx) => (
                  <div key={idx}>
                    <div className="bg-[#F1F1FF] px-4 py-2 text-base font-medium rounded-b-3xl rounded-tl-3xl rounded-tr ml-auto mt-4 max-w-[385px] text-right size-fit">
                      <MultilineText text={question} />
                    </div>
                    <div className="flex flex-row mr-auto mt-4 gap-2 justify-start items-start">
                      <Image
                        src="/logo-ai.svg"
                        width={36}
                        height={36}
                        alt="ai chatbot"
                      />
                      {answers[idx] ? (
                        <div className="bg-[#F4F4F4] px-4 py-2 text-base font-medium rounded-b-3xl rounded-tr-3xl rounded-tl size-fit min-w-48">
                          <TypingText text={answers[idx]} />
                        </div>
                      ) : (
                        <Image
                          src="/loading1.gif"
                          width={60}
                          height={60}
                          alt="loading..."
                        />
                      )}
                    </div>
                  </div>
                ))}
              </AutoScrollDiv>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center items-center">
              <Image
                src="/logo-ai.svg"
                width={54}
                height={54}
                alt="ai chatbot"
              />
              <div className="font-bold text-xl text-[#2D125F] mt-[12px]">
                릴리스 AI 비서
              </div>
              <div
                style={{
                  boxShadow: `0px 4px 6.3px 0px var(--Schemes-Outline-Variant, #CAC4D0)`,
                }}
                className="mt-[26px] rounded-[32px] p-[10px] text-center text-base font-medium text-[#6B6B6B] w-[363px] h-[93px] items-center"
              >
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
              <form action={chatbotSumbit}>
                <textarea
                  placeholder="릴리스 AI 비서에게 물어보기"
                  name="question"
                  value={questionInput}
                  onChange={(e) => {
                    setPromptLines(e.target.value.split("\n").length);
                    setQuestionInput(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      const submitButton = e.currentTarget
                        .nextElementSibling as HTMLButtonElement;
                      submitButton?.click();
                    }
                  }}
                  style={{ height: 40 + (promptLines - 1) * 20 }}
                  className={`bg-[#EFEFEF] w-full min-h-10 max-h-40 rounded-[24px] outline-none font-normal text-base pl-6 pr-12 py-2 resize-none overflow-y-scroll scrollbar-hide`}
                ></textarea>
                <button
                  disabled={isPending || !questionInput.length}
                  onClick={() => {
                    setPromptLines(1);
                    setQuestions((prev) => [...prev, questionInput]);
                    setShowPropertyList(true);
                    setTimeout(() => setQuestionInput(""), 0.1);
                  }}
                >
                  <Image
                    src="/btn-textarea-submit.svg"
                    width={32}
                    height={32}
                    alt="submit"
                    className="absolute bottom-[10.5px] right-[5px] cursor-pointer"
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

      <input
        placeholder="임시 유저이름"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        className="fixed top-3.5 right-60 z-[99] border-2 w-36"
      ></input>
    </div>
  );
}
