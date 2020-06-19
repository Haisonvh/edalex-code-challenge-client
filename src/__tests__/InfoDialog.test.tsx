import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render , screen } from "@testing-library/react";
import { MessageEntity } from "../api/MessageEntity";

import InfoDialog, { Props } from "../components/InfoDialog";

function renderInfoDialog(props: Partial<Props> = {}) {
  const defaultProps: Props = {
    open : true,
    handleClose() {
      return;
    },
    record:{
      id: 1,
      message: "displayed message",
      link:""
    }
  };
  return render(<InfoDialog {...defaultProps} {...props} />);
};

describe("UnitTest_InfoDialog", () => {
  test("Should display correct message", async () => {
    const { findByTestId } = renderInfoDialog();
    const dialogDesc = await findByTestId("test-dialog-description");
    const dialogTitle = await findByTestId("test-dialog-title");
    expect(dialogTitle).toHaveTextContent('Message id: 1');
    expect(dialogDesc).toHaveTextContent("displayed message");
  });
});
