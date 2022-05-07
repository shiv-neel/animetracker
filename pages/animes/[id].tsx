import { Box, Button, Heading, Image } from '@chakra-ui/react'
import axios from 'axios'
import {
	arrayRemove,
	arrayUnion,
	doc,
	getDoc,
	setDoc,
	updateDoc,
} from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { db } from '../../auth/firebase'
import { useAuth } from '../../auth/user'
import { getMyAnimeIds } from '../../utils/helpers/functions'
import { Anime } from '../../utils/types/anime'

interface PageProps {
	anime: Anime
}

const SingleAnimePage: React.FC<PageProps> = ({ anime }) => {
	const user = useAuth().user
	const [added, setAdded] = useState<boolean>(true)
	useEffect(() => {
		const bruh = async () => {
			const exists = await existsInList(anime.id)
			if (!exists) setAdded(false)
		}
		bruh()
	}, [])
	const addToMyList = async () => {
		if (user && user.uid) {
			const userDoc = doc(db, 'users', user.uid)
			await updateDoc(userDoc, {
				animes: arrayUnion(anime.id),
			})
		}
		setAdded(true)
	}

	const removeFromMyList = async () => {
		if (user && user.uid) {
			const userDoc = doc(db, 'users', user.uid)
			await updateDoc(userDoc, {
				animes: arrayRemove(anime.id),
			})
		}
		setAdded(false)
	}

	const existsInList = async (id: number) => {
		if (user && user.uid) {
			const animeIds = await getMyAnimeIds(user.uid)
			return animeIds?.find((a) => a === id)
		}
	}

	return (
		<Box className='m-10 space-y-10'>
			<Link href='/animes'>
				<Button className='gap-2'>
					<BsArrowLeft />
					Back
				</Button>
			</Link>
			<Heading as='h1'>{anime.name}</Heading>
			<Box className='flex gap-10'>
				<Image src={anime.image.medium} width={150} alt='' />
				<Box>
					<p>{anime.summary?.substring(3, anime.summary.length - 4)}</p>
					<Box className='flex my-10'>
						{!added ? (
							<Button
								className='gap-2'
								colorScheme={'twitter'}
								onClick={addToMyList}
							>
								<FaPlus />
								Add to My List
							</Button>
						) : (
							<Button
								className='gap-2'
								colorScheme={'red'}
								onClick={removeFromMyList}
							>
								<FaMinus />
								Remove from My List
							</Button>
						)}
					</Box>
				</Box>
			</Box>
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
	var paths = []
	for (let i = 0; i < 200000; i++) {
		paths.push({ params: { id: i.toString() } })
	}
	return {
		paths,
		fallback: false,
	}
}

export default SingleAnimePage
