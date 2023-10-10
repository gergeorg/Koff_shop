export class CartButton {
	constructor(className, text) {
		this.className = className
		this.text = text
	}

	create(id) {
		const button = document.createElement('button')
		button.classList.add(this.className)
		button.dataset.id = id
		button.textContent = this.text
		button.type = 'button'

		button.addEventListener('click', () => {
			console.log('Добавлено в корзину');
		})

		return button
	}
}