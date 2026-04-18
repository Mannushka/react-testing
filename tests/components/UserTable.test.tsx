import { render, screen, within } from "@testing-library/react";
import UserTable from "../../src/components/UserTable";
import { User } from "../../src/entities";

describe("UserTable", () => {
  it("should render no users when the users array is empty", () => {
    render(<UserTable users={[]} />);
    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  it("should render a table of users when the users array is not empty", () => {
    const users: User[] = [
      { id: 1, name: "Alice", isAdmin: true },
      { id: 2, name: "Bob", isAdmin: false },
      { id: 3, name: "Charlie", isAdmin: false },
    ];

    render(<UserTable users={users} />);

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(users.length + 1); // +1 for the header row

    for (let i = 1; i < rows.length; i++) {
      const cells = within(rows[i]).getAllByRole("cell");

      expect(cells[0]).toHaveTextContent(users[i - 1].id.toString());
      expect(cells[1]).toHaveTextContent(users[i - 1].name);

      const link = screen.getAllByRole("link", { name: /edit/i });
      const linkInCell = within(cells[2]).getByRole("link", { name: /edit/i });
      expect(linkInCell).toBeInTheDocument();
      expect(link[i - 1]).toHaveAttribute("href", `/users/${users[i - 1].id}`);
    }

    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(users.length);
    expect(headers[0]).toHaveTextContent(/id/i);
    expect(headers[1]).toHaveTextContent(/name/i);
    expect(headers[2]).toHaveTextContent("");
  });
});
