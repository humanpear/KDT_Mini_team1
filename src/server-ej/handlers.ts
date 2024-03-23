import { HttpResponse, http } from "msw";
import { accommodations } from "./data/accommodations";

export const handlers = [
	http.get("/api/accommodations", (resolver) => {
		return HttpResponse.json(accommodations);
	}),
	// http.post("/api/messages", async ({ request }) => {
	// 	const requestBody = await request.json();
	// 	const parsed = JSON.parse(requestBody);
	// 	console.log(parsed);
	// }),
];
