import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
jest.mock("next/router");

describe("SearchBar component", () => {
  it("renders without crashing", () => {
    render(<SearchBar />);
    expect(screen.getByText(/SearchBar/i)).toBeInTheDocument();
  });
});
