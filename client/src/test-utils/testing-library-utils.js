// test-utils.js
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
// Import your own reducer
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import reducer from "../reducers/rootReducer";

import { BrowserRouter } from "react-router-dom";
const middleware = [thunk];

function render(
  ui,
  {
    initialState,
    store = createStore(
      reducer,
      initialState,
      composeWithDevTools(applyMiddleware(...middleware))
    ),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// const renderWithRouter = (ui, { route = "/" } = {}) => {
//   window.history.pushState({}, "Test page", route);

//   return render(ui, { wrapper: BrowserRouter });
// };

/** ? ? ? ? ? ? ? ? ? ? ? ?  ? ? ? ? render with router ? ? ? ? ? ? ? ? ? ? ? ? ? */
// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
