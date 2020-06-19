import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render,waitFor,fireEvent,screen} from "@testing-library/react";
import { MessageEntity } from "../api/MessageEntity";
import MainBody from "../components/MainBody";
import * as api from "../api/ApiClient";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { act } from 'react-dom/test-utils';

//assume that server is well tested, so just focus on how client treat the response
describe("MainBody test get data", () => {
  test("Should get data after rendering", async () => {
    const mock = new MockAdapter(axios);
    const mockData = {"links":[{"rel":"self","href":"http://localhost:8080/api/messages"}],
    "content":[{"id":1,"message":"message one",
    "links":[{"rel":"self","href":"http://localhost:8080/api/messages/1"},
            {"rel":"messages","href":"http://localhost:8080/api/messages"}]}]};

    const url = "http://localhost:8080/api/messages";
    mock.onGet(url).reply(200, mockData);
    act(() => {
      render(<MainBody/>);
    });
    const contain = await screen.findByText("message one");
    expect(contain).toBeVisible();
  });

  test("Should show notification when get data error", async () => {
    const mock = new MockAdapter(axios);
    const mockData = {};
    const url = "http://localhost:8080/api/messages";
    mock.onGet(url).reply(404, mockData);
    act(() => {
      render(<MainBody/>);
    });
    const notification = await screen.findByTestId("test-notification-snackbar");
    expect(notification).toHaveTextContent("Cannot get data");
  });
});

describe("MainBody test add data", () => {
  test("Should call to get new data after add", async () => {
    const mock = new MockAdapter(axios);
    const mockData1 = {"links":[{"rel":"self","href":"http://localhost:8080/api/messages"}],
    "content":[{"id":1,"message":"message one",
    "links":[{"rel":"self","href":"http://localhost:8080/api/messages/1"},
            {"rel":"messages","href":"http://localhost:8080/api/messages"}]}]};

    const url = "http://localhost:8080/api/messages";
    mock.onGet(url).reply(200, mockData1);
    act(() => {
      render(<MainBody/>);
    });

    //new data
    const mockData2= {"links":[{"rel":"self","href":"http://localhost:8080/api/messages"}],
    "content":[{"id":2,"message":"message two",
    "links":[{"rel":"self","href":"http://localhost:8080/api/messages/2"},
            {"rel":"messages","href":"http://localhost:8080/api/messages"}]}]};

    mock.onGet(url).reply(200, mockData2);
    mock.onPost(url).reply(200, {"id":2,"message":"message two"});
    const buttonAdd = await screen.findByTestId("test-button-add");
    act(() => {
      fireEvent.click(buttonAdd);
    });

    const contain = await screen.findByText("message two");
    expect(contain).toBeVisible();

  });

  test("Should show notification when post data error", async () => {
    const mock = new MockAdapter(axios);
    const mockData = {};
    const url = "http://localhost:8080/api/messages";
    mock.onPost(url).reply(404, mockData);

    act(() => {
      render(<MainBody/>);
    });

    const buttonAdd = await screen.findByTestId("test-button-add");
    act(() => {
      fireEvent.click(buttonAdd);
    });
    const notification = await screen.findByTestId("test-notification-snackbar");
    expect(notification).toHaveTextContent("Cannot add message");
  });


  test("Should call add message api with changed value", async () => {
    jest.spyOn(api,'postMessages');
    act(() => {
      render(<MainBody/>);
    });
    const textFieldAdd = await screen.findByLabelText(/Required/i);
    const buttonAdd = await screen.findByTestId("test-button-add");
    fireEvent.change(textFieldAdd, { target: { value: "new message" } });
    act(() => {
      fireEvent.click(buttonAdd);
    });
    const data:MessageEntity={id:0, message:"new message", link:''}
    expect(api.postMessages).toHaveBeenCalledWith(data);
    jest.clearAllMocks();
  });
});

describe("MainBody test delete data", () => {
  beforeEach(() => {
    const mock = new MockAdapter(axios);
    const mockData = {"links":[{"rel":"self","href":"http://localhost:8080/api/messages"}],
    "content":[{"id":1,"message":"message one",
    "links":[{"rel":"self","href":"http://localhost:8080/api/messages/1"},
            {"rel":"messages","href":"http://localhost:8080/api/messages"}]}]};

    const url = "http://localhost:8080/api/messages";
    mock.onGet(url).reply(200, mockData);
  });

  test("Should call delete message api with selected id", async () => {
    jest.spyOn(api,'deleteMessages');
    window.confirm = jest.fn(() => true);
    act(() => {
      render(<MainBody/>);
    });
    const buttonDelete = await screen.findByTitle("Delete Message");
    act(() => {
      fireEvent.click(buttonDelete);
    });
    expect(api.deleteMessages).toHaveBeenCalledWith(1);
    jest.clearAllMocks();
  });

  test("Should not call delete message when not confirm", async () => {
    jest.spyOn(api,'deleteMessages');
    window.confirm = jest.fn(() => false);
    act(() => {
      render(<MainBody/>);
    });
    const buttonDelete = await screen.findByTitle("Delete Message");
    act(() => {
      fireEvent.click(buttonDelete);
    });
    expect(api.deleteMessages).not.toHaveBeenCalledWith(1);
    jest.clearAllMocks();
  });

  test("Should show notification when delete message error", async () => {
    window.confirm = jest.fn(() => true);
    act(() => {
      render(<MainBody/>);
    });

    const buttonDelete = await screen.findByTitle("Delete Message");

    const mock = new MockAdapter(axios);
    const url = "http://localhost:8080/api/messages";
    mock.onDelete(url).reply(404, {});

    act(() => {
      fireEvent.click(buttonDelete);
    });
    const notification = await screen.findByTestId("test-notification-snackbar");
    expect(notification).toHaveTextContent("Cannot delete message");
    jest.clearAllMocks();
  });

  test("Should call to get new data after delete message", async () => {
    jest.spyOn(api,'getAllMessages');
    jest.spyOn(api,'deleteMessages');
    window.confirm = jest.fn(() => true);
    act(() => {
      render(<MainBody/>);
    });
    
    const buttonDelete = await screen.findByTitle("Delete Message");
    const mock = new MockAdapter(axios);
    const url = "http://localhost:8080/api/messages";
    mock.onDelete(url).reply(200, {});

    act(() => {
      fireEvent.click(buttonDelete);
    });
    expect(api.deleteMessages).toHaveBeenCalledTimes(1);
    expect(api.getAllMessages).toHaveBeenCalledTimes(1);
    jest.clearAllMocks();
  });
});
