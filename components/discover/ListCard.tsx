import { Box, Button, Heading, Image } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { useAuth } from '../../auth/user'
import { addAnime } from '../../utils/helpers/functions'
import { CSVArrToString } from '../../utils/helpers/reducer'
import { Anime } from '../../utils/types/anime'

interface ListCardProps {
	anime: Anime
	existsInList: boolean
}

const ListCard: React.FC<ListCardProps> = ({ anime, existsInList }) => {
	const user = useAuth().user
	return (
		<Link href={`animes/${anime.id}`}>
			<Box
				className='flex my-10 gap-10 p-4 bg-gray-100 
      hover:bg-gray-200 shadow-md hover:shadow-lg cursor-pointer duration-100'
				rounded='md'
				maxWidth={700}
			>
				<Box>
					<Image src={anime.image.original} h={200} rounded={'lg'} />
				</Box>
				<Box className='flex flex-col'>
					<Heading as='h3' size='lg' my={2}>
						{anime.name}
					</Heading>
					<p className='text-md text-gray-400'>
						{CSVArrToString(anime.genres)}
					</p>
					<p className='text-md text-gray-400'>{anime.premiered.slice(0, 4)}</p>
					<Link href='/'>
						<a>Learn More</a>
					</Link>
					<Button
						mr={'auto'}
						colorScheme={'twitter'}
						disabled={existsInList}
						onClick={() => addAnime(user!.uid, anime)}
					>
						Add to My List
					</Button>
					{existsInList ? (
						<p className='text-sm text-red-400 mt-2'>
							This Anime is already in one of your lists.
						</p>
					) : (
						<></>
					)}
				</Box>
			</Box>
		</Link>
	)
}

export default ListCard
