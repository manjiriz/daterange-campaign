import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import CampaignList from "./CampaignList";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without a name", () => {
  act(() => {
    render(<CampaignList />, container);
  });
  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot();

  act(() => {
    render(<CampaignList startDate="10/11/2019" endDate="12/15/2019" isStartDateSelected={true} isEndDateSelected={false} searchResult={[]} />, container);
  });
  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot();
  
});