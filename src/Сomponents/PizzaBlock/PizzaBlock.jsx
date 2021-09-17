import React from "react";
import cn from "classnames";
import Button from "../Button";

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
  const pizzaSizes = ["M", "L", "XL", "XXL"];
  const [activeSize, setActiveSize] = React.useState(sizes[0]);

  const onSelectSize = (index) => {
    setActiveSize(index);
  };

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

  return (
    <div className="pizza-block">
      <div className="pizza-block__info">
        <h4 className="pizza-block__title">{name}</h4>
        <p className="pizza-block__text">
          Фирменная коробка В ПОДАРОК! Состав: 93% хлопок 7% эластан. 5 цветов в
          наличии.
        </p>
        {discount && (
          <p className="pizza-block__discount">Скидка {discount}% !!!</p>
        )}
        <div className="pizza-block__selector">
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
                  {!sizes.includes(size)
                    ? "Временно нет размера " + size
                    : size}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">
            <p className={discount && "price-throw"}>{price} грн.</p>
            {discount && (
              <p>{Math.floor(price - (price * discount) / 100)} грн.</p>
            )}
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
            {pizzasCountInCart && <i>{pizzasCountInCart}</i>}
          </Button>
        </div>
      </div>
      <img
        className="pizza-block__image"
        onClick={() => handleActiveModal(imageUrl)}
        src={imageUrl}
        alt="Pizza"
      />
    </div>
  );
}

export default PizzaBlock;
