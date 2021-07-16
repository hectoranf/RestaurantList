import { useAppContext } from '../../lib/context'
import Layout from '../../components/layout/layout'
import Link from 'next/link'

export default function Profile({ data }) {
	const { authState, setAuth } = useAppContext()

	return (
		<>
			<Layout>
				<section className='content-container'>
					{authState.user ? (
						<>
							<h1>Wellcome {authState.user.username}</h1>
						</>
					) : (
						<>
							<h1>Restricted area</h1>
							<h2>
								Please,{' '}
								<span className='blue'>
									<Link href='/login'>sign in</Link>
								</span>{' '}
								to visit your profile
							</h2>
						</>
					)}
				</section>
			</Layout>
		</>
	)
}
