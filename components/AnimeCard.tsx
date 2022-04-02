import { Box, Image } from '@chakra-ui/react'
import React from 'react'

interface CardProps {
	data: {
		id: number
		image: {
			medium: string
		}
		name: string
		type: string
		language: string
	}
}

const AnimeCard: React.FC<CardProps> = ({ data }) => {
	return (
		<Box className='flex justify-center flex-col'>
			<p className='mx-auto'>
				{data.name}: {data.language}
			</p>
			<Image
				src={data.image.medium}
				w={150}
				className='flex justify-center mx-auto'
				alt=''
			/>
		</Box>
	)
}

export default AnimeCard
