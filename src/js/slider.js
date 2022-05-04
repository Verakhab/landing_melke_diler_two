import Swiper, { Navigation } from 'swiper';

export default () => {
    const swiperMelke = new Swiper('.slider-systems-melke', {
        modules: [Navigation],
        slidesPerView: 'auto',
        spaceBetween: 20,
        initialSlide: 1,
        slideActiveClass: 'slide-systems-melke-active',
        centeredSlides: true,
        navigation: {
            nextEl: ".slider-systems-melke__prev",
            prevEl: ".slider-systems-melke__next",
        }
    });

    const swiperPut = new Swiper('.slider-put', {
        slidesPerView: 'auto',
        spaceBetween: 20,
    });

    const swiperGlazing = new Swiper('.slider-glazing', {
        modules: [Navigation],
        slidesPerView: 'auto',
        spaceBetween: 20,
        navigation: {
            nextEl: ".slider-glazing__prev",
            prevEl: ".slider-glazing__next",
        }
    });

    if (screen.width < 1225) {
        const swiperBenefit = new Swiper('.slider-benefit', {
            slidesPerView: 'auto',
            spaceBetween: 20,
        });

        const swiperOptions = new Swiper('.slider-options', {
            slidesPerView: 'auto',
            spaceBetween: 20,
        });
    }

    if (screen.width < 935) {
        const swiperGlazingBalcony = new Swiper('.slider-glazing-balcony', {
            slidesPerView: 'auto',
            spaceBetween: 20,
        });
    }

    const swiperGlazingHouse = new Swiper('.slider-glazing-house', {
        slidesPerView: 'auto',
        spaceBetween: 20,
    });

    const swiperOurAdvantages = new Swiper('.slider-our-advantages', {
        slidesPerView: 'auto',
        spaceBetween: 20,
    });
}