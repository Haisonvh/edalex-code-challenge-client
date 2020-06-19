import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render,fireEvent} from "@testing-library/react";
import { MessageEntity } from "../api/MessageEntity";
import TableView, { Props } from "../components/TableView";

function renderTableView(props: Partial<Props> = {}) {
  const defaultProps: Props = {
    data : [],
    deleteAction() {
      return;
    }
  };
  return render(<TableView {...defaultProps} {...props} />);
};

describe("UnitTest_TableView", () => {
  test("Should display no data", async () => {
    const { findByText} = renderTableView();
    const contain = await findByText("No records to display");
    expect(contain).toBeVisible();
  });

  test("Should display data", async () => {
    const temp:MessageEntity[] = [{
      id: 1,
      message: 'message 1',
      link:""}];
    const { findByText} = renderTableView({data:temp});
    const contain = await findByText("message 1");
    expect(contain).toBeVisible();
  });

  test("Should show dialog info", async () => {
    const temp:MessageEntity[] = [{
      id: 1,
      message: 'message 1',
      link:""}];
    const { findByTestId,findByTitle} = renderTableView({data:temp});
    const buttonView = await findByTitle("View Message");

    fireEvent.click(buttonView);
    
    const dialog = await findByTestId("test-dialog");
    expect(dialog).toBeVisible();
  });
});
