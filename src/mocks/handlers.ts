import { HttpResponse, http } from "msw";
import { accommodations } from "./data/accommodations";
import { carts } from "./data/carts";
import { SelectedAccommodation } from "../types/reservedAccommodation";
import { reservations } from "./data/reservations";

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
    carts.push(accommodation as SelectedAccommodation);
    return new Response(null, { status: 200 });
  }),
  http.get("/api/reservations", () => {
    return HttpResponse.json(reservations);
  }),
  http.get("/api/reservations/:reservationId", ({ params }) => {
    return HttpResponse.json(
      reservations.find((item) => item.contentid === params.reservationId)
    );
  }),
  http.post("/api/reservations", async ({ request }) => {
    const accommodation = await request.json();
    reservations.push(accommodation as SelectedAccommodation);
    return new Response(null, { status: 200 });
  }),
];
