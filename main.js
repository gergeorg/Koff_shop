import 'normalize.css'
import './style.scss'

import Navigo from 'navigo';

import { Header } from './modules/Header/Header';
import { Main } from './modules/Main/Main';
import { Footer } from './modules/Footer/Footer';
import { Order } from './modules/Order/Order';
import { ProductList } from './modules/ProductList/ProductList';
import { ApiService } from './services/ApiService';
import { Catalog } from './modules/Catalog/Catalog';
import { FavoriteService } from './services/StorageService';
import { Pagination } from './features/Pagination/Pagination';

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
  const router = new Navigo('/', { linksSelector: 'a[href^="/"]' })
  new Header().mount()
  new Main().mount()
  new Footer().mount()

  api.getProdictCategories().then(data => {
    new Catalog().mount(new Main().element, data)
    router.updatePageLinks()
  })
  productSlider()

  router
  .on('/', async () => {
    const products = await api.getProducts()
    new ProductList().mount(new Main().element, products)
    router.updatePageLinks()
  }, {
    leave(done) {
      new ProductList().unmount()
      done()
    },
    already(match) {
      match.route.handler(match)
    }
  })
  .on('/category', async ({params: {slug, page}}) => {
    const { data, pagination } = await api.getProducts({ category: slug, page: page || 1 })
    new ProductList().mount(new Main().element, data, slug)
    new Pagination().mount(new ProductList().containerElement).update(pagination)
    router.updatePageLinks()
  }, {
    leave(done) {
      new ProductList().unmount()
      done()
    }
  })
  .on('/favorite', async () => {
    const favorite = new FavoriteService().get()
    const {data: products} = await api.getProducts({ list: favorite.join(',') })
    new ProductList().mount(new Main().element, products, 'Избранное', 'Вы ничего не добавили в избранное')
    router.updatePageLinks()
  },  {
    leave(done) {
      new ProductList().unmount()
      done()
    }, 
    already(match) {
      match.route.handler(match)
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
    <div class="container error">
      <h2 class="error__title">Страница не найдена &#128577;</h2>
      <p class="error__text">Через несколько секунд вы будете перенаправлены 
        <a href="/" class="error__link">на главную страницу</a>
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