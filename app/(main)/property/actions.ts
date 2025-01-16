import { ChatbotRes } from "@/app/types/chatbot";

export async function ask(prevState: any, formData: FormData) {
  //eslint-disable-line

  // 챗봇 api 호출
  const question = formData.get("question") as string;
  // const res = await fetch()

  let res = "ㅋ";
  setTimeout(() => {
    res = "답변!";
  }, 5000);
  //   const places = ["a"]

  return { answer: res } as ChatbotRes;
}
