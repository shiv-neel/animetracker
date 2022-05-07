import React from 'react'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { BiCopyright } from 'react-icons/bi'
import Link from 'next/link'
import { FaInfoCircle } from 'react-icons/fa'

const Footer = () => {
	return (
		<footer className='flex h-24 mt-auto justify-between mx-10 py-10'>
			<div className='flex items-center gap-3'>
				<BiCopyright className='text-2xl' />
				Shiva Neelakantan 2022
			</div>
			<ul className='flex gap-4 justify-center items-center'>
				<a
					href='https://github.com/shiv-neel'
					target='_blank'
					rel='noopener noreferrer'
					className='transition duration-200 hover:scale-125 hover:text-blue-500'
				>
					<BsGithub className='text-2xl' />
				</a>
				<a
					href='https://linkedin.com/in/shiva-neelakantan'
					target='_blank'
					rel='noopener noreferrer'
					className='transition duration-200 hover:scale-125 hover:text-blue-500'
				>
					<BsLinkedin className='text-2xl' />
				</a>
				<Link href='/info'>
					<a className='transition duration-200 hover:scale-125 hover:text-blue-500'>
						<FaInfoCircle className='text-2xl' />
					</a>
				</Link>
			</ul>
		</footer>
	)
}

export default Footer
