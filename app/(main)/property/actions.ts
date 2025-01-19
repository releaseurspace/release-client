import { ChatbotRes } from "@/app/types/chatbot";
import { Property } from "@/app/types/property";
import callAPI from "@/app/util/call-api";

export async function ask(prevState: any, formData: FormData) {  //eslint-disable-line

  const question = formData.get("question") as string;
  const res = await (
    await callAPI({
      url: "http://3.38.128.30:3080/langchain",
      method: "POST",
      isPrivate: false,
      body: {
        userId: "chaerin",
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
