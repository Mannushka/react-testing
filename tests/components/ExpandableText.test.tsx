import { render, screen } from "@testing-library/react";

import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + "...";
  it("should render the full text if its length is less than or equal to 255 characters and display no 'show more' button", () => {
    const text = "a";
    render(<ExpandableText text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();

    const button = screen.queryByRole("button", { name: /more/i });
    expect(button).not.toBeInTheDocument();
  });

  it("should render the truncated text if the text is longer than 255 characters", () => {
    render(<ExpandableText text={longText} />);
    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument(); //this line is not necessary because .getByRole will throw an error if the element is not found, but it makes the test more robust
    expect(button).toHaveTextContent(/more/i);
  });

  it("should display the 'show more' button when the text is longer than 255 characters and render the whole text when the 'show more' button is clicked", async () => {
    render(<ExpandableText text={longText} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(screen.queryByText(truncatedText)).not.toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

  it("should render the truncated text again when the 'show less' button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const showMoreButton = screen.getByRole("button", { name: /more/i });
    const user = userEvent.setup();
    await user.click(showMoreButton);

    const showLessButton = screen.getByRole("button", { name: /less/i });
    await user.click(showLessButton);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(screen.queryByText(longText)).not.toBeInTheDocument();
    expect(showMoreButton).toHaveTextContent(/more/i);
  });
});
