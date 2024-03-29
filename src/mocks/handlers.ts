import { HttpResponse, http } from "msw";
import { accommodations } from "./data/accommodations";
import { carts } from "./data/carts";
import { reservations } from "./data/reservations";
import { ReservedAccommodation } from "../types/reservedAccommodation";

export const handlers = [
  http.get("/api/accommodations", () => {
    return HttpResponse.json(accommodations);
  }),
  http.get("/api/accommodations/category/:category", ({ params }) => {
    return HttpResponse.json(
      accommodations.filter((item) => item.category === params.category)
    );
  }),
  http.get("/api/accommodations/:contentid", ({ params }) => {
    return HttpResponse.json(
      accommodations.find((item) => item.contentid === params.contentid)
    );
  }),
  http.get("/api/carts", () => {
    return HttpResponse.json(carts);
  }),
  http.post("/api/carts", async ({ request }) => {
    const accommodation = await request.json();
    carts.push(accommodation as ReservedAccommodation);
    return new Response(null, { status: 200 });
  }),
  http.get("/api/reservations/history", () => {
    return HttpResponse.json(reservations);
  }),
  http.get("/api/reservations/:reservationId", ({ params }) => {
    return HttpResponse.json(
      reservations.find((item) => item.reservation.id === params.reservationId)
    );
  }),
  http.post("/api/payments/reservation", async ({ request }) => {
    const accommodation = await request.json();
    reservations.push(accommodation as ReservedAccommodation);
    return new Response(null, { status: 200 });
  }),
  http.post("/api/payments/cart-reservation", async ({ request }) => {
    const accommodation = await request.json();
    const seletedIndex = carts.findIndex(
      (item) =>
        item.contentid === (accommodation as ReservedAccommodation).contentid
    );
    reservations.push(accommodation as ReservedAccommodation);
    carts.splice(seletedIndex, 1);
    return new Response(null, { status: 200 });
  }),
  http.put("/api/carts/:id", ({ params }) => {
    const seletedIndex = carts.findIndex(
      (item) => item.contentid === params.id
    );
    carts.splice(seletedIndex, 1);
    return new Response(null, { status: 200 });
  }),
];
