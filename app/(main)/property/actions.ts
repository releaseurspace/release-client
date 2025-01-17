import { ChatbotRes } from "@/app/types/chatbot";

export async function ask(prevState: any, formData: FormData) {  //eslint-disable-line

  // 챗봇 api 호출
  //   const question = formData.get("question") as string;
  // const res = await fetch()

  const res = `크림브륄레 레시피
  휘핑크림 500ml
  백설탕 100g
  바닐라 익스트랙 1~2티스푼
  노른자 6개
  황설탕 1티스푼`;
  //   const places = ["a"]

  return { answer: res } as ChatbotRes;
}
