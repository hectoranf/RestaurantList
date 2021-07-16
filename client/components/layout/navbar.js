import Image from 'next/image'
import { useRef } from 'react'
import Link from 'next/link'
import { useAppContext } from '../../lib/context'
import { useRouter } from 'next/router'
import { logout } from '../../services/auth.service'

export default function Navbar() {
	const { authState } = useAppContext() //Context API
	const router = useRouter()

	const burgerRef = useRef()
	const menuRef = useRef()

	const responsiveMenu = () => {
		burgerRef.current.classList.toggle('active')
		menuRef.current.classList.toggle('active')
	}

	const handleLogout = () => {
		burgerRef.current.classList.toggle('active')
		menuRef.current.classList.toggle('active')

		logout()
			.then(() => {
				router.push('/')
			})
			.catch((err) => console.log(err))
	}

	return (
		<nav className='navbar'>
			<Link href={'/'} passHref>
				<figure className='logo'>
					<Image src='/images/logo.svg' layout='fill' alt='logo'></Image>
				</figure>
			</Link>

			{authState ? (
				<ul ref={menuRef} className='menu'>
					{/* <li onClick={() => responsiveMenu()}>
						<Link href={'/login'}>login</Link>
					</li> */}
					<li onClick={() => handleLogout()}>logout</li>
				</ul>
			) : (
				<ul ref={menuRef} className='menu'>
					<li onClick={() => responsiveMenu()}>
						<Link href={'/login'}>login</Link>
					</li>
					<li onClick={() => responsiveMenu()}>
						<Link href={'/signup'}>sign up</Link>
					</li>
				</ul>
			)}
			<div ref={burgerRef} onClick={() => responsiveMenu()} className='hamburger'>
				<span className='bar'></span>
				<span className='bar'></span>
				<span className='bar'></span>
			</div>
		</nav>
	)
}
