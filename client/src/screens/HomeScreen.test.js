// import { render, screen } from "@testing-library/react";
import { render, screen, waitFor } from "../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import HomeScreen from "./HomeScreen";
import { Provider } from "react-redux";

test("should render Homescreen correctly", async () => {
  render(<HomeScreen />);

  // const header = screen.getByRole("heading", { name: /latest product/i });
  // expect(header).toBeInTheDocument();

  // await screen.findByRole("img", {
  //   name: /Airpods Wireless Bluetooth Headphones/i,
  // });
  await waitFor(async () => {
    const images = await screen.findAllByRole("img");
    expect(images).toHaveLength(2);
  });
});

// test("should go to the selected product", async () => {
//   render(<HomeScreen />);

//   const imageLink = await screen.findByRole("link", {
//     name: /Airpods Wireless Bluetooth Headphones/i,
//   });
//   userEvent.click(imageLink);

//   /** go back button */
//   await screen.findByRole("link", { name: /go back/i });

//   /** image */
//   await screen.findByRole("img");
//   await screen.findByRole("heading", {
//     name: /Airpods Wireless Bluetooth Headphones/i,
//   });
// });
