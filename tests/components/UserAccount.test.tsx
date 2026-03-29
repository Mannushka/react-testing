import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount", () => {
  it("should render user name", () => {
    const user: User = { id: 1, name: "John Doe", isAdmin: false };
    render(<UserAccount user={user} />);
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });

  it("should render Edit button if user is admin", () => {
    const user: User = { id: 1, name: "John Doe", isAdmin: true };
    render(<UserAccount user={user} />);
    const button = screen.queryByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Edit");
  });

  it("should not render Edit button if user is not admin", () => {
    const user: User = { id: 1, name: "John Doe", isAdmin: false };
    render(<UserAccount user={user} />);
    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });
});
