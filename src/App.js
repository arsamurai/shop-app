import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import "./scss/app.scss";
import { Header, Footer } from "./Сomponents";
import { Home, Cart, Pizza } from "./Pages";

function App() {
  const pizza = useSelector(({ pizzaBlock }) => pizzaBlock.pizza);

  return (
    <div className="App">
      <Header />
      <Route path="/" render={() => <Home />} exact />
      <Route path="/cart" render={() => <Cart />} exact />
      <Route path="/pizza" exact>
        {pizza.id ? <Pizza pizza={pizza} /> : <Redirect to="/" />}
      </Route>
      <Footer />
    </div>
  );
}

export default App;
