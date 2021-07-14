const hamburger = document.querySelector('.hamburger')
const navMenu = document.querySelector('.nav-menu')

hamburger.addEventListener('click', responsiveMenu)

const responsiveMenu = () => {
	hamburger.classList.toggle('active')
	navMenu.classList.toggle('active')
}
