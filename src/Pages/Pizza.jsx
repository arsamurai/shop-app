import React from "react";
import cn from "classnames";
import Button from "../Сomponents/Button";
import { useSelector, useDispatch } from "react-redux";
import { addPizza } from "../Redux/cart";
import Modal from "../Сomponents/Modal";
import { useHistory } from "react-router-dom";

function Pizza({ pizza }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const cartItems = useSelector(({ cart }) => cart.items);

  const pizzaSizes = ["36", "37", "38", "39", "40", "41"];
  const [activeSize, setActiveSize] = React.useState(pizza.sizes[0]);

  const [activeModal, setActiveModal] = React.useState(false);

  const handleActiveModal = () => {
    setActiveModal(true);
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

  const onSelectSize = (index) => {
    setActiveSize(index);
  };

  const handleOnAddPizza = () => {
    const obj = {
      id: pizza.id,
      name: pizza.name,
      imageUrl: pizza.imageUrl,
      size: activeSize,
      firstPrice: pizza.firstPrice,
      discount: pizza.discount,
      price: pizza.price,
    };
    dispatch(addPizza(obj));
  };

  return (
    <div className="wrapper pizza--container">
      <div className="pizza">
        <div className="pizza__info">
          <h4 className="pizza__title">{pizza.name}</h4>
          <p className="pizza__description">{pizza.description}</p>
          <p className="pizza__sewing">{pizza.sewing}</p>
          {pizza.discount && (
            <p className="pizza__discount">Скидка {pizza.discount}% !!!</p>
          )}
          <div className="pizza__selector">
            <ul>
              {pizzaSizes.map((size, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => onSelectSize(size)}
                    className={cn(
                      { active: activeSize === size },
                      { disabled: !pizza.sizes.includes(size) }
                    )}
                  >
                    {!pizza.sizes.includes(size)
                      ? "Временно нет размера " + size
                      : size}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="pizza__bottom">
            <div className="pizza__price">
              <p className={pizza.discount && "pizza__price-throw"}>
                {pizza.firstPrice} грн.
              </p>
              {pizza.discount && <p>{pizza.price} грн.</p>}
            </div>
            <Button onClick={handleOnAddPizza} className="button--add" outline>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>Купить</span>
              {countOfPizzasInCart(pizza.id) && (
                <i>{countOfPizzasInCart(pizza.id)}</i>
              )}
            </Button>
          </div>
        </div>
        <div className="pizza__image">
          <img
            onClick={() => handleActiveModal()}
            src={pizza.imageUrl}
            alt="Pizza"
          />
        </div>
      </div>
      <Button
        className="button button--outline button--add go-back-btn"
        onClick={() => history.goBack()}
      >
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 13L1 6.93015L6.86175 1"
            stroke="#D3D3D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Вернуться назад</span>
      </Button>
      <Modal
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        modalForImg
      >
        <img className="modal__img" src={pizza.imageUrl} alt="modal-pizza" />
      </Modal>
    </div>
  );
}

export default Pizza;
