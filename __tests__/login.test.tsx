import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Login from "../src/components/pages/Login";
import StoreProvider from "@/components/redux/StoreProvider";
import userEvent from "@testing-library/user-event";

describe("Login Page", () => {
  it("renders Login component", () => {
    render(
      <StoreProvider>
        <Login />
      </StoreProvider>
    );

    const myElem = screen.getByText("Ghi nhớ đăng nhập");

    expect(myElem).toBeInTheDocument();
  });

  it("expect password input to be in the doc", () => {
    render(
      <StoreProvider>
        <Login />
      </StoreProvider>
    );

    const passwordInput = screen.queryByTestId("password");

    expect(passwordInput).toBeInTheDocument();
  });
});
