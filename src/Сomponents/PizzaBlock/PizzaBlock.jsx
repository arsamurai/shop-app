import React from "react";
import cn from "classnames";
import Button from "../Button";
import { setPizza } from "../../Redux/pizzaBlock";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function PizzaBlock({
  id,
  name,
  imageUrl,
  sizes,
  price,
  discount,
  onClickAddPizza,
  handleActiveModal,
  pizzasCountInCart,
}) {
  const pizzaSizes = ["XS", "S", "M", "L", "XL"];
  const [activeSize, setActiveSize] = React.useState(sizes[0]);

  const pizza = useSelector(({ pizzaBlock }) => pizzaBlock);

  const onSelectSize = (index) => {
    setActiveSize(index);
  };

  const dispatch = useDispatch();

  const handleOnAddPizza = () => {
    const obj = {
      id,
      name,
      imageUrl,
      size: activeSize,
      discount,
      price: discount ? Math.floor(price - (price * discount) / 100) : price,
    };
    onClickAddPizza(obj);
  };

  const handleSetPizza = () => {
    const obj = {
      id,
      name,
      imageUrl,
      sizes,
      firstPrice: price,
      discount,
      price: discount ? Math.floor(price - (price * discount) / 100) : price,
    };
    console.log(pizza);
    dispatch(setPizza(obj));
  };

  return (
    <div className="pizza-block">
      <img
        className="pizza-block__image"
        onClick={() => handleActiveModal(imageUrl)}
        src={imageUrl}
        alt="Pizza"
      />
      <h4 className="pizza-block__title">{name}</h4>
      <p className="pizza-block__text">
        Фирменная коробка В ПОДАРОК! Состав: 93% хлопок 7% эластан. 5 цветов в
        наличии.
      </p>
      {/* <div className="pizza-block__selector">
        <ul>
          {pizzaSizes.map((size, index) => {
            return (
              <li
                key={index}
                onClick={() => onSelectSize(size)}
                className={cn(
                  { active: activeSize === size },
                  { disabled: !sizes.includes(size) }
                )}
              >
                {!sizes.includes(size) ? "Временно нет размера " + size : size}
              </li>
            );
          })}
        </ul>
      </div> */}
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">
          <p className={discount && "price-throw"}>{price} грн.</p>
          {discount && (
            <p>{Math.floor(price - (price * discount) / 100)} грн.</p>
          )}
        </div>
        <Link
          to="/pizza"
          onClick={handleSetPizza}
          className="button button--add button--outline"
          outline
        >
          <span>Заказать</span>
          {pizzasCountInCart && <i>{pizzasCountInCart}</i>}
        </Link>
      </div>
    </div>
  );
}

export default PizzaBlock;
