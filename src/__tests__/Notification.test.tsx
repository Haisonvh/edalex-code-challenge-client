import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";

import Notification, { Props } from "../components/Notification";

function renderNotification(props: Partial<Props> = {}) {
  const defaultProps: Props = {
    open : true,
    handleClose() {
      return;
    },
    message: "Test Notification"
  };
  return render(<Notification {...defaultProps} {...props} />);
};

describe("UnitTest_Notification", () => {
  test("Should display correct message", async () => {
    const { findByTestId } = renderNotification();
    const notification = await findByTestId("test-notification-snackbar");
    expect(notification).toHaveTextContent("Test Notification");
  });
});
