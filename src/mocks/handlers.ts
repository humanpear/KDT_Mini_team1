import { HttpResponse, http } from "msw";
import { accommodations } from "./data/accommodations";

export const handlers = [
  http.get("/api/accommodations", () => {
    return HttpResponse.json(accommodations);
  }),
  http.get("/api/accommodations/:contentid", ({ params }) => {
    return HttpResponse.json(
      accommodations.find((item) => item.contentid === params.contentid)
    );
  }),
];
