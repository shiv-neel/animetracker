import { Box, Button, Image } from '@chakra-ui/react'
import { arrayRemove, doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { FaMinus } from 'react-icons/fa'
import { db } from '../auth/firebase'
import { useAuth } from '../auth/user'
import { Anime } from '../utils/types/anime'

interface CardProps {
	data: {
		id: number
		image: {
			medium: string
		}
		name: string
		type: string
		genres: string | string[]
	}
}

const AnimeCard: React.FC<CardProps> = ({ data }) => {
	const user = useAuth().user

	return (
		<Box
			maxW={324}
			h={350}
			className='mx-auto justify-center flex-col space-y-2 bg-slate-50 hover:bg-slate-200 duration-200 shadow-md py-5 rounded-lg hover:scale-105 hover:font-bold'
		>
			<p className='flex justify-center text-xl text-center'>{data.name}</p>
			<p className='flex justify-center italic'>
				{typeof data.genres === 'string'
					? data.genres
					: data.genres.sort().join(', ')}
			</p>
			<Image
				rounded='lg'
				shadow='md'
				src={data.image.medium}
				w={150}
				className='flex justify-center mx-auto'
				alt=''
			/>
		</Box>
	)
}

export default AnimeCard
