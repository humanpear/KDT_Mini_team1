import { HttpResponse, http } from "msw";
import { accommodations } from "./data/accommodations";
import { carts } from "./data/carts";
import { reservations } from "./data/reservations";
import { ReservedAccommodation } from "../types/reservedAccommodation";
import uuid from "react-uuid";

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
    const requestBody = await request.json();
    const accommodation = accommodations.find((accomoodation) =>
      accomoodation.room.some((room) => room.id === requestBody.room_id)
    );
    reservations.push({
      accommodation,
      reservation: { id: uuid(), ...requestBody },
    });
    return HttpResponse.json({
      accommodation,
      reservation: { id: uuid(), ...requestBody },
    });
  }),
  http.post("/api/payments/cart-reservation", async ({ request }) => {
    const requestBody = await request.json();
    const seletedIndex = carts.findIndex(
      (cart) => cart.contentid === requestBody.cart_id
    );
    const accommodation = accommodations.find((accomoodation) =>
      accomoodation.room.some(
        (room) => room.id === requestBody.reservation.room_id
      )
    );
    reservations.push({
      accommodation,
      reservation: { id: uuid(), ...requestBody.reservation },
    });
    carts.splice(seletedIndex, 1);
    return HttpResponse.json({
      accommodation,
      reservation: { id: uuid(), ...requestBody.reservation },
    });
  }),
  http.put("/api/carts/:id", ({ params }) => {
    const seletedIndex = carts.findIndex(
      (item) => item.contentid === params.id
    );
    carts.splice(seletedIndex, 1);
    return new Response(null, { status: 200 });
  }),
];
