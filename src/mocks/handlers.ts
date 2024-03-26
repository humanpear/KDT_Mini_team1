import { HttpResponse, http } from "msw";
import { accommodations } from "./data/accommodations";
import { carts } from "./data/carts";
import { SelectedAccommodation } from "../types/selectedAccommodation";
import { reservationAccommodations } from "./data/reservationAccommodations";

let reservationAccommodation: SelectedAccommodation | null = null;

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
  http.get("/api/reservation", () => {
    return HttpResponse.json(reservationAccommodation);
  }),
  http.post("/api/reservation", async ({ request }) => {
    const accommodation = await request.json();
    reservationAccommodation = accommodation as SelectedAccommodation;
    return new Response(null, { status: 200 });
  }),
  http.get("/api/reservations/:reservationId", ({ params }) => {
    return HttpResponse.json(
      reservationAccommodations.find(
        (item) => item.contentid === params.reservationId
      )
    );
  }),
  http.post("/api/reservations", async ({ request }) => {
    const accommodation = await request.json();
    reservationAccommodations.push(accommodation as SelectedAccommodation);
    return new Response(null, { status: 200 });
  }),
];
