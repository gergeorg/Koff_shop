import { favoriteSvg } from '../favoriteSvg/favoriteSvg';


export class FavoriteButton {
	constructor(className) {
		this.className = className
	}

	create(id) {
		const button = document.createElement('button')
		button.classList.add(this.className)
		button.dataset.id = id
		button.setAttribute("aria-label", "Добавить товар в избранное");
		button.type = 'button'
		favoriteSvg().then((svg) => {
			button.append(svg)
		})

		button.addEventListener('click', () => {
			console.log('Добавлено в избранное');
		})

		return button
	}
}