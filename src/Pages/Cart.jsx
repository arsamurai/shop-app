import React, { useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../Сomponents/CartItem";
import {
  clearCart,
  removeCartItem,
  plusCartItem,
  minusCartItem,
} from "../Redux/cart";
import cartEmptyImage from "../assets/img/empty-cart.png";
import Modal from "../Сomponents/Modal";
import { Button } from "../Сomponents";
import { useHistory } from "react-router-dom";

function Cart() {
  const phoneRegExp = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  );

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Что-то слишком короткое имя*")
      .max(50, "Что-то очень длинное имя*")
      .required("Поле для ввода имени обязательно*"),
    lastName: Yup.string()
      .min(2, "Что-то слишком короткая фамилия*")
      .max(50, "Что-то очень длинная фамилия*")
      .required("Поле для ввода фамилия обязательно*"),
    telNumber: Yup.string()
      .matches(phoneRegExp, "Не верный номер телефона*")
      .required("Поле для ввода номера телефона обязательно*"),
    email: Yup.string()
      .email("Введите корректный адрес почты*")
      .required("Поле для ввода электронной почты обязательно*"),
  });

  const dispatch = useDispatch();
  const { totalCount, totalPrice, items } = useSelector(({ cart }) => cart);

  const addedPizzas = Object.keys(items).map((key) => {
    return items[key].items[0];
  });

  const [componentOfModal, setComponentOfModal] = useState(null);
  const history = useHistory();

  const formRef = useRef();
  const [formValues, setFormValues] = useState([]);

  const onClearCart = () => {
    setActiveModal(true);

    setComponentOfModal(
      <div className="modal__component">
        <p className="modal__component-text">
          Вы действительно хотите очистить корзину?
        </p>
        <Link
          to="/"
          onClick={() => {
            dispatch(clearCart());
            setActiveModal(false);
          }}
          className="button"
        >
          Да
        </Link>
        <button onClick={() => setActiveModal(false)} className="button">
          Нет
        </button>
      </div>
    );
  };

  const onRemoveCartItem = (id, size) => {
    setActiveModal(true);

    setComponentOfModal(
      <div className="modal__component">
        <p className="modal__component-text">
          Вы действительно хотите удалить?
        </p>
        <button
          onClick={() => {
            dispatch(removeCartItem(id, size));
            setActiveModal(false);
          }}
          className="button"
        >
          Да
        </button>
        <button onClick={() => setActiveModal(false)} className="button">
          Нет
        </button>
      </div>
    );
  };

  const onMinusItem = (id, size) => {
    dispatch(minusCartItem(id, size));
  };

  const onPlusItem = (id, size) => {
    dispatch(plusCartItem(id, size));
  };

  const [activeModal, setActiveModal] = React.useState(false);

  const onPayPizzas = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
    console.log("Заказ:", items, "Клиент:", formValues);
    dispatch(clearCart());
    setComponentOfModal(
      <div className="modal__component">
        <p className="modal__component-text">
          Ваш заказ отправлен! Ожидайте звонка...
        </p>
        <Link to="/" onClick={() => setActiveModal(false)} className="button">
          Хорошо
        </Link>
      </div>
    );
    setActiveModal(true);
  };

  return (
    <>
      <div className="wrapper container--cart">
        {totalCount ? (
          <div className="cart">
            <div className="cart__top">
              <h2 className="content__title">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Корзина
              </h2>
              <div className="cart__clear">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 5H4.16667H17.5"
                    stroke="#B6B6B6"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
                    stroke="#B6B6B6"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.33337 9.16667V14.1667"
                    stroke="#B6B6B6"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.6666 9.16667V14.1667"
                    stroke="#B6B6B6"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span onClick={onClearCart}>Очистить корзину</span>
              </div>
            </div>
            <div className="content__items">
              {addedPizzas.map((pizza) => {
                return (
                  <CartItem
                    key={pizza.id + pizza.size}
                    id={pizza.id}
                    name={pizza.name}
                    size={pizza.size}
                    discount={pizza.discount}
                    imageUrl={pizza.imageUrl}
                    totalPrice={items[pizza.id + ":" + pizza.size].totalPrice}
                    totalCount={items[pizza.id + ":" + pizza.size].totalCount}
                    onRemove={onRemoveCartItem}
                    onMinus={onMinusItem}
                    onPlus={onPlusItem}
                  />
                );
              })}
            </div>
            <div className="cart__bottom">
              <div className="cart__bottom-details">
                <span>
                  Всего пицц: <b>{totalCount} шт.</b>
                </span>
                <span>
                  Сумма заказа: <b>{totalPrice} ₽</b>
                </span>
              </div>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  telNumber: "",
                  message: "",
                }}
                validationSchema={DisplayingErrorMessagesSchema}
                onSubmit={(values) => {
                  setFormValues(values);
                }}
                innerRef={formRef}
              >
                {({ errors, touched }) => (
                  <Form class="form">
                    <div class="form-left-decoration"></div>
                    <div class="form-right-decoration"></div>
                    <div class="circle"></div>
                    <div class="form-inner">
                      <h3>Заполните, пожалуйста, форму:</h3>
                      <div className="form-field">
                        {/* <label for="person-name" className="labelPersonName">
                          Имя...
                        </label> */}
                        <Field
                          type="text"
                          name="firstName"
                          id="person-name"
                          className="personName"
                          placeholder="Имя..."
                        />
                        {errors.firstName && touched.firstName ? (
                          <div className="errorMessage">{errors.firstName}</div>
                        ) : null}
                      </div>
                      <div className="form-field">
                        {/* <label
                          for="person-surname"
                          className="labelPersonSurname"
                        >
                          Фамилия...
                        </label> */}
                        <Field
                          type="text"
                          id="person-surname"
                          name="lastName"
                          placeholder="Фамилия..."
                        />
                        {errors.lastName && touched.lastName ? (
                          <div className="errorMessage">{errors.lastName}</div>
                        ) : null}
                      </div>
                      <div className="form-field">
                        <Field
                          type="email"
                          name="email"
                          placeholder="Электроннная почта..."
                        />
                        {errors.email && touched.email ? (
                          <div className="errorMessage">{errors.email}</div>
                        ) : null}
                      </div>
                      <div className="form-field">
                        <Field
                          type="tel"
                          name="telNumber"
                          placeholder="Номер телефона..."
                        />
                        {errors.telNumber && touched.telNumber ? (
                          <div className="errorMessage">{errors.telNumber}</div>
                        ) : null}
                      </div>
                      <div className="form-field">
                        <Field
                          type="text"
                          name="message"
                          placeholder="Ваше сообщение..."
                          as="textarea"
                        />
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="cart__bottom-buttons">
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
                <button
                  type="submit"
                  onClick={onPayPizzas}
                  className="button pay-btn"
                >
                  <span>Заказать</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="cart cart--empty">
            <h2>
              Корзина пустая <i>😕</i>
            </h2>
            <p>
              Вероятней всего, вы не заказывали ещё пиццу.
              <br />
              Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            <img src={cartEmptyImage} alt="Empty cart" />
            <Button
              className="button button--black"
              onClick={() => history.goBack()}
            >
              <span>Вернуться назад</span>
            </Button>
          </div>
        )}
      </div>
      <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
        {componentOfModal}
      </Modal>
    </>
  );
}

export default Cart;
