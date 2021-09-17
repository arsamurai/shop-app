import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import filters from "./filters";
import pizzas from "./pizzas";
import cart from "./cart";

let reducers = combineReducers({
  filters,
  pizzas,
  cart
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;
