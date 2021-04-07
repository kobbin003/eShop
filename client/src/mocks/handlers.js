// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  /** GET all products */
  rest.get("/api/products", (req, res, ctx) => {
    console.log("api/products is working");
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json([
        {
          name: "Airpods Wireless Bluetooth Headphones",
          image: "/images/airpods.jpg",
          description:
            "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
          brand: "Apple",
          category: "Electronics",
          price: 89.99,
          countInStock: 10,
          rating: 4.5,
          numReviews: 12,
        },
        {
          name: "iPhone 11 Pro 256GB Memory",
          image: "/images/phone.jpg",
          description:
            "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
          brand: "Apple",
          category: "Electronics",
          price: 599.99,
          countInStock: 7,
          rating: 4.0,
          numReviews: 8,
        },
      ])
    );
  }),

  /** GET product by ID */
  // rest.get("http://localhost:4100/api/products/:productId", (req, res, ctx) => {
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       name: "Airpods Wireless Bluetooth Headphones",
  //       image: "/images/airpods.jpg",
  //       description:
  //         "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
  //       brand: "Apple",
  //       category: "Electronics",
  //       price: 89.99,
  //       countInStock: 10,
  //       rating: 4.5,
  //       numReviews: 12,
  //     })
  //   );
  // }),
];
