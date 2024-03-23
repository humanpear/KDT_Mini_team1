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
