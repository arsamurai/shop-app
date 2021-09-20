import React from "react";
import Button from "./Button";

// import Swiper core and required modules
//import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

//import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

function Benefit({ handleChangeCategoryOnDiscount }) {
  return (
    // <Swiper
    //   // install Swiper modules
    //   modules={[Navigation, Pagination, Scrollbar, A11y]}
    //   spaceBetween={50}
    //   slidesPerView={3}
    //   navigation
    //   pagination={{ clickable: true }}
    //   scrollbar={{ draggable: true }}
    // >
    //   <SwiperSlide>
    <div className="benefit">
      <div className="benefit-main">
        <h2 className="benefit-title">
          Fashion <span className="secondWord">Clothes</span>
        </h2>
        <p className="benefit-text">Только у нас вы найдёте что-то полезное!</p>
        <Button
          onClick={handleChangeCategoryOnDiscount}
          className="button--add benefit-btn"
          outline
        >
          Ко скидкам!
        </Button>
      </div>
    </div>
    //   </SwiperSlide>
    //   <SwiperSlide>
    //     <div className="benefit">
    //       <div className="benefit-main">
    //         <h2 className="benefit-title">
    //           ss <span className="secondWord">Clothes</span>
    //         </h2>
    //         <p className="benefit-text">
    //           Только у нас вы найдёте что-то полезное!
    //         </p>
    //         <Button
    //           onClick={handleChangeCategoryOnDiscount}
    //           className="button--add benefit-btn"
    //           outline
    //         >
    //           Ко скидкам!
    //         </Button>
    //       </div>
    //     </div>
    //   </SwiperSlide>
    //   <SwiperSlide>
    //     <div className="benefit">
    //       <div className="benefit-main">
    //         <h2 className="benefit-title">
    //           ffqfqf <span className="secondWord">Clothes</span>
    //         </h2>
    //         <p className="benefit-text">
    //           Только у нас вы найдёте что-то полезное!
    //         </p>
    //         <Button
    //           onClick={handleChangeCategoryOnDiscount}
    //           className="button--add benefit-btn"
    //           outline
    //         >
    //           Ко скидкам!
    //         </Button>
    //       </div>
    //     </div>
    //   </SwiperSlide>
    // </Swiper>
  );
}

export default Benefit;
