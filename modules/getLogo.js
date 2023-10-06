import logoImg from '/logo.svg'

export const getLogo = (linkClass, logoClass) => {
	const logo = document.createElement('a')
	logo.classList.add(linkClass)
	logo.href = '/'

	const imgLogo = new Image()
	imgLogo.classList.add(logoClass)
	imgLogo.src = logoImg
	imgLogo.alt = 'Логотип интернет-магазина мебели Koff'
	logo.append(imgLogo)

	return logo
}