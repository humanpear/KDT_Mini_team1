import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function getAccommodations({ pageParam }: { pageParam: number }) {
	try {
		const res = await fetch(`/api/accommodations?page=${pageParam}`);
		const data = await res.json();

		return data;
	} catch (err) {
		console.error("Error:", err);
	}
}

export async function getAccommodation(contentid: string) {
	try {
		const res = await fetch(`/api/accommodations/${contentid}`);
		const data = await res.json();

		return data;
	} catch (err) {
		console.error("Error:", err);
	}
}
