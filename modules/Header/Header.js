import { getLogo } from '../../features/Logo/Logo';
import { favoriteSvg } from '../../features/favoriteSvg/favoriteSvg';
import { addContainer } from '../addContainer';

export class Header {
	static instance = null;

	constructor() {
		if (!Header.instance) {
			Header.instance = this;
			this.element = document.createElement('header');
			this.element.classList.add('header');
			this.containerElem = addContainer(this.element, 'header__container');
			this.isMounted = false;
		}
		
		return Header.instance;
	}

	mount() {
		if (this.isMounted) {
			return;
		}

		const logo = getLogo('header__link-logo', 'header__logo')
		const searchForm = this.getSearchForm()
		const navigation = this.getNavigation()

		this.containerElem.append(logo, searchForm, navigation)

		document.body.append(this.element);
		this.isMounted = true;
	}

	unmount () {
		this.element.remove()
		this.isMounted = false
	}

	getSearchForm() {
		const searchForm = document.createElement('form')
		searchForm.classList.add('header__search')
		searchForm.method = 'get'

		const input = document.createElement('input')
		input.classList.add('header__input')
		input.type = 'search'
		input.name = 'search'
		input.placeholder = 'Введите запрос'

		const button = document.createElement('button')
		button.classList.add('header__btn')
		button.type = 'submit'

		button.innerHTML = `
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M7.66659 13.9999C11.1644 13.9999 13.9999 11.1644 13.9999 7.66659C13.9999 4.16878 11.1644 1.33325 7.66659 1.33325C4.16878 1.33325 1.33325 4.16878 1.33325 7.66659C1.33325 11.1644 4.16878 13.9999 7.66659 13.9999Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M14.6666 14.6666L13.3333 13.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		`

		searchForm.append(input, button)

		return searchForm
	}

	getNavigation() {
		const navigation = document.createElement('nav')
		navigation.classList.add('header__control')

		const favoriteLink = document.createElement('a')
		favoriteLink.classList.add('header__link')
		favoriteLink.href = '/favorite'

		favoriteSvg().then(svg => {
			favoriteLink.append(svg)
		})
	
		// favoriteLink.innerHTML = `
		// 	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		// 		<path d="M8.41325 13.8733C8.18658 13.9533 7.81325 13.9533 7.58658 13.8733C5.65325 13.2133 1.33325 10.46 1.33325 5.79332C1.33325 3.73332 2.99325 2.06665 5.03992 2.06665C6.25325 2.06665 7.32658 2.65332 7.99992 3.55998C8.67325 2.65332 9.75325 2.06665 10.9599 2.06665C13.0066 2.06665 14.6666 3.73332 14.6666 5.79332C14.6666 10.46 10.3466 13.2133 8.41325 13.8733Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
		// 	</svg>
		// `

		const favoriteLinkText = document.createElement('span')
		favoriteLinkText.classList.add('header__link-text')
		favoriteLinkText.textContent = 'Избранное'

		favoriteLink.append(favoriteLinkText)

		const cartLink = document.createElement('a')
		cartLink.classList.add('header__link')
		cartLink.href = '/cart'

		const cartLinkText = document.createElement('span')
		cartLinkText.classList.add('header__link-text')
		cartLinkText.textContent = 'Корзина'

		const countElem = document.createElement('span')
		countElem.classList.add('header__count')
		countElem.textContent = '(0)'

		cartLink.append(cartLinkText, countElem)

		cartLink.insertAdjacentHTML('beforeend', `
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M5.87329 1.33325L3.45996 3.75325" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M10.1267 1.33325L12.54 3.75325" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M1.33325 5.23324C1.33325 3.9999 1.99325 3.8999 2.81325 3.8999H13.1866C14.0066 3.8999 14.6666 3.9999 14.6666 5.23324C14.6666 6.66657 14.0066 6.56657 13.1866 6.56657H2.81325C1.99325 6.56657 1.33325 6.66657 1.33325 5.23324Z" stroke="currentColor"/>
				<path d="M6.50659 9.33325V11.6999" stroke="currentColor" stroke-linecap="round"/>
				<path d="M9.57324 9.33325V11.6999" stroke="currentColor" stroke-linecap="round"/>
				<path d="M2.33325 6.66675L3.27325 12.4267C3.48659 13.7201 3.99992 14.6667 5.90658 14.6667H9.92659C11.9999 14.6667 12.3066 13.7601 12.5466 12.5067L13.6666 6.66675" stroke="currentColor" stroke-linecap="round"/>
			</svg>
		`)

		navigation.append(favoriteLink, cartLink)

		this.countElem = countElem

		return navigation
	}

	changeCount(n) {
		//todo получить n
		this.countElem.textContent = `(${n})`
	}
}
