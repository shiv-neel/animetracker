import { Box, Button, Image } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../auth/user'

const Navbar = () => {
	const user = useAuth().user
	return (
		<Box>
			<ul className='flex space-x-10 justify-end py-4 px-10 items-center bg-blue-400 shadow-md'>
				<li className='mr-auto text-lg'>Logo</li>
				<Link passHref href='/animes'>
					<li className='cursor-pointer hover:underline text-lg'>My Animes</li>
				</Link>
				<Link passHref href='/discover'>
					<li className='cursor-pointer hover:underline text-lg'>Discover</li>
				</Link>
				<Link passHref href='/friends'>
					<li className='cursor-pointer hover:underline text-lg'>Friends</li>
				</Link>
				{user ? (
					<Link passHref href='/account'>
						{user.photoURL ? (
							<a>
								<Image
									className='hover:scale-105 duration-75'
									src={user.photoURL as string}
									maxW={16}
									rounded='xl'
									alt='avi'
								/>
							</a>
						) : (
							<FaUser />
						)}
					</Link>
				) : (
					<Link passHref href='/signin'>
						<Button colorScheme={'twitter'}>Sign In</Button>
					</Link>
				)}
			</ul>
		</Box>
	)
}

export default Navbar
