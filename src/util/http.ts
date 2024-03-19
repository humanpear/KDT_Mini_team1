import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function getStaies() {
	const response = await fetch(
		"https://apis.data.go.kr/B551011/KorService1/searchStay1?serviceKey=MsxYgw9OmLnI%2FJxWb8sjvl29U9ftFGCpBIQpMFqVl9McOqLmd47plGbcZxOTCnNCl72LWm%2Bw8ggcmMBz7VBuMg%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A",
	);

	const data = await response.json();
	const items = data.response.body.items.item;

	return items;
}
