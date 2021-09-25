import React, { useEffect } from "react";
import {
  Categories,
  SortPopup,
  PizzaBlock,
  PizzaLoadingBlock,
} from "../Сomponents";
import { useSelector, useDispatch } from "react-redux";
import { setCategory, setSortBy } from "../Redux/filters";
import { fetchPizzas } from "../Redux/pizzas";
import { addPizza } from "../Redux/cart";
import Modal from "../Сomponents/Modal";
import Benefit from "../Сomponents/Benefit";

const categoryNames = [
  "Женское бельё",
  "Мужское бельё",
  "Купальники",
  "Плавки",
  "Скидки",
];
const sortItems = [
  { name: "популярности", type: "rating", order: "desc" },
  { name: "алфавиту", type: "name", order: "asc" },
  { name: "цене", type: "price", order: "desc" },
];

const Home = React.memo(function Home() {
  const dispatch = useDispatch();
  const pizzas = useSelector(({ pizzas }) => pizzas.pizzas);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  useEffect(() => {
    dispatch(fetchPizzas(category, sortBy));
  }, [category, sortBy]);

  const onChangeCategory = React.useCallback(
    (index) => {
      dispatch(setCategory(index));
    },
    [category]
  );

  const onSelectSortBy = React.useCallback(
    (sortBy) => {
      dispatch(setSortBy(sortBy));
    },
    [sortBy]
  );

  const onAddPizzaToCart = (obj) => {
    dispatch(addPizza(obj));
  };

  const [activeModal, setActiveModal] = React.useState(false);
  const [imgForModal, setImgForModal] = React.useState(null);

  const handleActiveModal = (img) => {
    setActiveModal(true);
    setImgForModal(img);
  };

  const countOfPizzasInCart = (itemId) => {
    const allPizzasOfDefiniteCateg = [];
    Object.values(cartItems).map((item) => {
      item.items.map((interiorItem) => {
        if (interiorItem.id === itemId) {
          allPizzasOfDefiniteCateg.push(interiorItem);
        }
      });
    });
    if (allPizzasOfDefiniteCateg.length) return allPizzasOfDefiniteCateg.length;
  };

  return (
    <>
      <Benefit onChangeCategory={onChangeCategory} />
      <div className="wrapper">
        <div className="content__top">
          <Categories
            activeItem={category}
            onChangeCategory={onChangeCategory}
            items={categoryNames}
          />
          <SortPopup
            activeItem={sortBy.type}
            items={sortItems}
            onSelectSortBy={onSelectSortBy}
          />
        </div>
        <h2 className="content__title">
          {category === null
            ? "Все товары:"
            : "Все товары выбранной категории:"}
        </h2>
        <div className="content__items">
          {isLoaded
            ? pizzas.map((pizza) => (
                <PizzaBlock
                  key={pizza.id}
                  onClickAddPizza={onAddPizzaToCart}
                  handleActiveModal={handleActiveModal}
                  pizzasCountInCart={countOfPizzasInCart(pizza.id)}
                  {...pizza}
                />
              ))
            : Array(12)
                .fill(0)
                .map((_, index) => <PizzaLoadingBlock key={index} />)}
        </div>
        <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
          <img className="modal__img" src={imgForModal} alt="modal-pizza" />
        </Modal>
      </div>
    </>
  );
});

export default Home;
