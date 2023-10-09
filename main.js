import 'normalize.css'
import './style.scss'

import Navigo from 'navigo';

import { Header } from './modules/Header/Header';
import { Main } from './modules/Main/Main';
import { Footer } from './modules/Footer/Footer';
import { Order } from './modules/Order/Order';
import { ProductList } from './modules/ProductList/ProductList';
import { ApiService } from './services/ApiService';

const productSlider = () => {
  Promise.all([
    import("swiper/modules"),
    import("swiper"),
    import("swiper/css"),
  ]).then(([{ Navigation, Thumbs }, Swiper]) => {
    const swiperThumbnails = new Swiper.default(".product__slider-thumbnails", {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    new Swiper.default(".product__slider-main", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".product__arrow_next",
        prevEl: ".product__arrow_prev",
      },
      modules: [Navigation, Thumbs],
      thumbs: {
        swiper: swiperThumbnails,
      },
    });
  })
}


const init = () => {
  const api = new ApiService()
  new Header().mount()
  new Main().mount()
  new Footer().mount()

  productSlider()

  const router = new Navigo('/', { linksSelector: 'a[href^="/"]' })

  router
  .on('/', async () => {
    const product = await api.getProducts()

    new ProductList().mount(new Main().element, product)
  }, {
    leave(done) {
      done()
    },
    already() {

    }
  })
  .on('/category', () => {
    console.log('category');
    new ProductList().mount(new Main().element, [1,2,3,4], 'category')
  }, {
    leave(done) {
      done()
    }
  })
  .on('/favorite', () => {
    console.log('favorite');
    new ProductList().mount(new Main().element, [1], 'Избранное')
  },  {
    leave(done) {
      done()
    }
  })
  .on('/search', () => {
    console.log('search');
  })
  .on('/product/:id', ({}) => {
    console.log('product');
  })
  .on('/cart', () => {
    console.log('cart');
  })
  .on('/order', () => {
    new Order().mount(new Main().element);
    console.log('order');
  })
  .notFound(() => {
    // todo
    //стилизовать этот блок
    //после ухода на главную - утрать блок с ошибкой

    new Main().element.innerHTML = `
    <div class="container">
      <h2>Страница не найдена</h2>
      <p>Через несколько секунд вы будете перенаправлены 
        <a href="/" class="">на главную страницу</a>
      </p>
    </div>
    `

    setTimeout(() => {
      router.navigate('/')
    }, 5000)
  })

  router.resolve()
}

init()