import { Box } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { FaPlus } from 'react-icons/fa'

const DummyCard = () => {
	return (
		<Link href='/discover'>
			<Box
				w={324}
				h={350}
				className='flex mx-auto justify-center bg-slate-50 shadow-md py-5 rounded-lg text-center text-xl gap-3 items-center hover:bg-slate-200 hover:cursor-pointer  duration-200'
			>
				<FaPlus />
				Add
			</Box>
		</Link>
	)
}

export default DummyCard
