import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("Back button should be disabled on question 1", async () => {
  render(<App />);
  const backBtn = await screen.findByRole("button", { name: "Back" });
  expect(backBtn).toBeDisabled();
});

test("Next button should be disabled when the answer of the current question is not given", async () => {
  render(<App />);
  const nextBtn = await screen.findByRole("button", { name: "Next" });
  expect(nextBtn).toBeDisabled();
});

test("Error message should be shown when the answer of the current question is not given", async () => {
  render(<App />);
  const singleSelect = await screen.findByRole("button", { name: /answer ​/i });
  userEvent.tab();
  await waitFor(() => {
    expect(singleSelect).toHaveFocus();
  });
  userEvent.tab();
  await waitFor(() => {
    expect(singleSelect).not.toHaveFocus();
  });
  expect(screen.getByText("* Answer cannot be empty")).toBeVisible();
});

test("Quiz results should be shown correctly", async () => {
  render(<App />);
  userEvent.click(await screen.findByRole("button", { name: /answer ​/i }));
  userEvent.click(await screen.findByRole("option", { name: "C-3PO" }));
  userEvent.click(await screen.findByRole("button", { name: /next/i }));

  userEvent.type(
    await screen.findByLabelText("Who played Princess Leia?"),
    "Carrie Fisher"
  );
  userEvent.click(await screen.findByRole("button", { name: /next/i }));

  userEvent.click(await screen.findByRole("button", { name: /answer ​/i }));
  userEvent.click(await screen.findByRole("option", { name: "1977" }));
  userEvent.click(await screen.findByRole("button", { name: /next/i }));

  userEvent.click(await screen.findByRole("button", { name: /answer ​/i }));
  userEvent.click(await screen.findByRole("option", { name: "800" }));
  userEvent.click(await screen.findByRole("button", { name: /next/i }));

  userEvent.type(
    await screen.findByLabelText("What does AT-AT stand for?"),
    "All Terrain Armored"
  );
  userEvent.click(
    await screen.findByRole("button", { name: "Submit Answers" })
  );

  expect(await screen.findByText("3 / 5")).toBeVisible();
});

test("Try it again button should redirect users to the start of the quiz", async () => {
  render(<App />);
  userEvent.click(await screen.findByRole("button", { name: /answer ​/i }));
  userEvent.click(await screen.findByRole("option", { name: "C-3PO" }));
  userEvent.click(await screen.findByRole("button", { name: /next/i }));

  userEvent.type(
    await screen.findByLabelText("Who played Princess Leia?"),
    "Carrie Fisher"
  );
  userEvent.click(await screen.findByRole("button", { name: /next/i }));

  userEvent.click(await screen.findByRole("button", { name: /answer ​/i }));
  userEvent.click(await screen.findByRole("option", { name: "1977" }));
  userEvent.click(await screen.findByRole("button", { name: /next/i }));

  userEvent.click(await screen.findByRole("button", { name: /answer ​/i }));
  userEvent.click(await screen.findByRole("option", { name: "800" }));
  userEvent.click(await screen.findByRole("button", { name: /next/i }));

  userEvent.type(
    await screen.findByLabelText("What does AT-AT stand for?"),
    "All Terrain Armored"
  );
  userEvent.click(
    await screen.findByRole("button", { name: "Submit Answers" })
  );
  userEvent.click(await screen.findByRole("button", { name: "Try it again!" }));

  expect(
    await screen.findByText(
      "Select a characters who appear in every Star Wars movie."
    )
  ).toBeVisible();
});
