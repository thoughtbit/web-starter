import { rest } from "msw";
import faker from "faker";

const createUser = () => ({
  name: faker.name,
});

const createUsers = (numUsers = 5) => {
  return Array.from({ length: numUsers }, createUser);
};

export const commonHandlers = [
  rest.get("/", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(createUsers(10)));
  }),
  rest.get("https://api.mooocss.com/book", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: "10333292-7ca1-4361-bf38-b6b43b90cb16",
          name: "John Maverick",
          text: "Lord of The Rings, is with no absolute hesitation, my most favored and adored book by‑far. The triology is wonderful‑ and I really consider this a legendary fantasy series. It will always keep you at the edge of your seat‑ and the characters you will grow and fall in love with!",
        },
        {
          id: "20333292-7ca1-4361-bf38-b6b43b90cb16",
          name: "John Maverick",
          text: "Lord of The Rings, is with no absolute hesitation, my most favored and adored book by‑far. The triology is wonderful‑ and I really consider this a legendary fantasy series. It will always keep you at the edge of your seat‑ and the characters you will grow and fall in love with!",
        },
        {
          id: "30333292-7ca1-4361-bf38-b6b43b90cb16",
          name: "John Maverick",
          text: "Lord of The Rings, is with no absolute hesitation, my most favored and adored book by‑far. The triology is wonderful‑ and I really consider this a legendary fantasy series. It will always keep you at the edge of your seat‑ and the characters you will grow and fall in love with!",
        },
      ])
    );
  }),
  rest.get("/reviews", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: "10333292-7ca1-4361-bf38-b6b43b90cb16",
          name: "John Maverick",
          text: "Lord of The Rings, is with no absolute hesitation, my most favored and adored book by‑far. The triology is wonderful‑ and I really consider this a legendary fantasy series. It will always keep you at the edge of your seat‑ and the characters you will grow and fall in love with!",
        },
        {
          id: "20333292-7ca1-4361-bf38-b6b43b90cb16",
          name: "John Maverick",
          text: "Lord of The Rings, is with no absolute hesitation, my most favored and adored book by‑far. The triology is wonderful‑ and I really consider this a legendary fantasy series. It will always keep you at the edge of your seat‑ and the characters you will grow and fall in love with!",
        },
        {
          id: "30333292-7ca1-4361-bf38-b6b43b90cb16",
          name: "John Maverick",
          text: "Lord of The Rings, is with no absolute hesitation, my most favored and adored book by‑far. The triology is wonderful‑ and I really consider this a legendary fantasy series. It will always keep you at the edge of your seat‑ and the characters you will grow and fall in love with!",
        },
        {
          id: "40333292-7ca1-4361-bf38-b6b43b90cb16",
          name: "John Maverick",
          text: "Lord of The Rings, is with no absolute hesitation, my most favored and adored book by‑far. The triology is wonderful‑ and I really consider this a legendary fantasy series. It will always keep you at the edge of your seat‑ and the characters you will grow and fall in love with!",
        },
      ])
    );
  }),
];
