import { Box, Button, Heading, Image } from '@chakra-ui/react'
import axios from 'axios'
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { MY_ANIMES } from '.'
import { db } from '../../auth/firebase'
import { useAuth } from '../../auth/user'
import { Anime } from '../../types/anime'

interface PageProps {
	anime: Anime
}

const SingleAnimePage: React.FC<PageProps> = ({ anime }) => {
	const user = useAuth().user

	const addToMyList = async () => {
		if (user && user.uid) {
			const userDoc = doc(db, 'users', user.uid)
			await updateDoc(userDoc, {
				animes: arrayUnion(anime.id),
			})
		}
	}

	return (
		<Box>
			<Heading as='h1'>{anime.name}</Heading>
			<Image src={anime.image.medium} width={150} alt='' />
			{anime.summary?.substring(3, anime.summary.length - 4)}
			<Button className='gap-2' onClick={addToMyList}>
				<FaPlus />
				Add to My List
			</Button>
		</Box>
	)
}

export const getStaticProps = async (ctx: any) => {
	const id = ctx.params!.id
	const res = await axios.get(`https://api.tvmaze.com/shows/${id}`)
	const data: Anime = res.data
	return {
		props: {
			anime: data,
		},
	}
}

export const getStaticPaths = async () => {
	var animes: Anime[] = []

	// getting the ids of all animes
	for (let i = 0; i < MY_ANIMES.length; i++) {
		const res = await axios.get(
			`https://api.tvmaze.com/singlesearch/shows?q=${MY_ANIMES[i]}`
		)
		animes.push(res.data)
	}
	const paths = animes.map((a) => ({ params: { id: a.id.toString() } }))
	// paths must be an array of objects of type { params: { id } }
	return {
		paths,
		fallback: false,
	}
}

export default SingleAnimePage
