import { render, screen } from "@testing-library/react";
import TermsAndConditions from "../../src/components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

describe("TermsAndConditions", () => {
  const renderComponent = () => {
    render(<TermsAndConditions />);

    return {
      heading: screen.getByRole("heading"),
      checkbox: screen.getByRole("checkbox"),
      button: screen.getByRole("button", { name: /submit/i }),
    };
  };

  it("should render the terms and conditions text", () => {
    const { heading, checkbox, button } = renderComponent();

    // expect(heading).toBeInTheDocument(); // this line is not necessary because .getByRole will throw an error if the element is not found
    expect(heading).toHaveTextContent("Terms & Conditions");

    // expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    // expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("should enable the submit button when the checkbox is checked", async () => {
    //arrange
    const { checkbox, button } = renderComponent();

    //act
    const user = userEvent.setup();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    //assert
    expect(button).toBeEnabled();
  });
});
