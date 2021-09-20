import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import filters from "./filters";
import pizzas from "./pizzas";
import cart from "./cart";
import pizzaBlock from "./pizzaBlock";

let reducers = combineReducers({
  filters,
  pizzas,
  cart,
  pizzaBlock,
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;
