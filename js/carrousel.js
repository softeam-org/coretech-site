const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 5000
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 1
      }
    }
  });

const swiper2 = new Swiper(".mySwiper2", {
  slidesPerView: 3,
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 1000
  },
  breakpoints: {
    768: {
      slidesPerView: 3
    }
  }
});

const swiper3 = new Swiper(".mySwiper3", {
  slidesPerView: 3,
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 1000
  },
  breakpoints: {
    768: {
      slidesPerView: 3
    }
  }
});