const SET_PIZZA = "SET-PIZZA";

let initializationState = {
  pizza: {},
};

const pizzaBlock = (state = initializationState, action) => {
  switch (action.type) {
    case SET_PIZZA:
      return {
        ...state,
        pizza: action.pizza,
      };
    default:
      return state;
  }
};

export const setPizza = (pizza) => ({
  type: SET_PIZZA,
  pizza,
});

export default pizzaBlock;
