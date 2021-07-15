import Image from 'next/image'
import { useRef } from 'react'

export default function Navbar() {
	const burgerRef = useRef()
	const menuRef = useRef()

	const responsiveMenu = () => {
		burgerRef.current.classList.toggle('active')
		menuRef.current.classList.toggle('active')
	}

	return (
		<nav className='navbar'>
			<figure className='logo'>
				<Image src='/images/logo.svg' layout='fill' alt='logo'></Image>
			</figure>
			<ul ref={menuRef} className='menu'>
				<li onClick={() => responsiveMenu()}>login</li>
				<li onClick={() => responsiveMenu()}>Sign up</li>
			</ul>
			<div ref={burgerRef} onClick={() => responsiveMenu()} className='hamburger'>
				<span className='bar'></span>
				<span className='bar'></span>
				<span className='bar'></span>
			</div>
		</nav>
	)
}
