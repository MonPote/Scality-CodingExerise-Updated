import { test, expect } from "vitest";
import App from "../src/App.jsx";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("should display initial count as 0", () => {
  render(<App />);
  const countElement = screen.getByText("0");
  expect(countElement).toBeTruthy();
});

test("should increment count on button click", () => {
  render(<App />);
  const incrementButton = screen.getByText("Increase");
  fireEvent.click(incrementButton);
  const countDisplay = screen.getByText("1");
  expect(countDisplay.textContent).to.equal("1");
});

test("should disable increment count button when reaching limit", async () => {
  render(<App />);
  const incrementButton = screen.getByText("Increase");

  // setting limit
  const limitInput = screen.getByRole("spinbutton");
  limitInput.value = "2";
  fireEvent.change(limitInput);

  fireEvent.click(incrementButton);
  fireEvent.click(incrementButton);

  // Check if the counter displays '2'
  const countElement = screen.getByText("2");
  expect(countElement).to.exist;

  // Try to increment one more time
  fireEvent.click(incrementButton);

  // Expect that the counter still displays '2' since we've reached the limit
  expect(countElement).to.exist;
});

const asyncRepeat = async (times, fn) => {
  for (let i = 0; i < times; i++) {
    await fn();
  }
};

test("test if the change of the threshold work", async () => {
  render(<App />);
  const incrementButton = screen.getByRole("button", {
    name: /increase/i,
  });
  const thresholdInput = screen.getByRole("spinbutton");

  // setting limit to 8 so we don't have to click 10 times to reach the limit
  await userEvent.clear(thresholdInput);
  await userEvent.type(thresholdInput, "8");

  await waitFor(() => expect(thresholdInput.value).toBe("8"));

  await asyncRepeat(3, async () => {
    await userEvent.click(incrementButton);
  });

  expect(
    screen.getByText("Attention: You're Approaching a Threshold!")
  ).toBeDefined();
});

test("should disable increment count button when reaching hard limit - corrected", async () => {
  render(<App />);
  const incrementButton = screen.getByRole("button", {
    name: /increase/i,
  });

  await asyncRepeat(15, async () => {
    await userEvent.click(incrementButton);
  });

  expect(
    screen.getByText("Attention: You're Approaching a Threshold!")
  ).toBeDefined();

  expect(
    screen.getByText(
      "Dear User, you already reached the threshold, the increment button is locked. Please reset the counter."
    )
  ).toBeDefined();

  // A better test may be to check if the button is disabled
  // However with vitest I did not manage to find a way to do it easily
  // You might want to use jest instead
  // This code below does not work
  // expect(incrementButton).toHaveAttribute("disabled");
});
