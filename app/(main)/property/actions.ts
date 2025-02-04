"use server";

import { ChatbotRes } from "@/app/types/chatbot";
import { Property } from "@/app/types/property";
import callAPI from "@/app/util/call-api";

export const maxDuration = 30;

export async function ask(prevState: any, formData: FormData) {  //eslint-disable-line

  const question = formData.get("question") as string;
  const username = formData.get("username") as string;
  const res = await (
    await callAPI({
      url: process.env.NEXT_PUBLIC_SERVER_URL + "/langchain",
      method: "POST",
      isPrivate: false,
      body: {
        userId: username,
        content: question,
      },
    })
  ).json();

  const answer = res.chatResponse;
  const properties = res.properties.map((property: Property) => {
    return {
      id: property.id,
      latitude: property.latitude,
      longitude: property.longitude,
      purpose: property.purpose,
      deposit: property.deposit,
      monthly_rent: property.monthly_rent,
      key_money: property.key_money,
      maintenance_fee: property.maintenance_fee,
      size: property.size,
      description: property.description,
      floor: property.floor,
      nearest_station: property.nearest_station,
      distance_to_station: property.distance_to_station,
    };
  });

  return { answer, properties } as ChatbotRes;
}
