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

export async function getCarts() {
  try {
    const res = await fetch("/api/carts");
    const data = await res.json();

    return data;
  } catch (err) {
    console.error("Error:", err);
  }
}

export async function getReservation() {
  try {
    const res = await fetch("/api/reservation");
    const data = await res.json();

    return data;
  } catch (err) {
    console.error("Error:", err);
  }
}
