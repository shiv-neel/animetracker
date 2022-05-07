import {
	Box,
	Button,
	Divider,
	Grid,
	Heading,
	Skeleton,
	Stack,
} from '@chakra-ui/react'
import axios from 'axios'
import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore'
import { NextPage } from 'next'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../auth/firebase'
import { AuthContext, useAuth } from '../../auth/user'
import AnimeCard from '../../components/AnimeCard'
import DummyCard from '../../components/DummyCard'
import { UserDocData } from '../../utils/helpers/functions'
import { Anime } from '../../utils/types/anime'

export interface AnimeResponse {
	myAnimes: {
		id: number
		image: {
			original: string
		}
		name: string
		type: string
		language: string
	}[]
}

const Index: NextPage<AnimeResponse> = () => {
	const [myAnimes, setMyAnimes] = useState<Anime[] | void>([])
	const user = useAuth().user
	useEffect(() => {
		const getData = async () => {
			if (user) {
				const docRef = doc(db, 'users', user!.uid)
				const animes = await getDoc(docRef)
				const res = animes.data() as UserDocData
				const animeIds = res.animes

				var animeData: Anime[] = []
				if (animeIds)
					for (let i = 0; i < animeIds?.length; i++) {
						const data = await axios.get(
							`https://api.tvmaze.com/shows/${animeIds[i]}`
						)
						animeData.push(data.data)
					}
				setMyAnimes(animeData)
			}
		}
		getData()
	}, [user, myAnimes])

	return (
		<Box className='mx-48'>
			<Heading as='h1' className='mt-16 mb-10'>
				My Animes
			</Heading>
			<Divider />
			<Heading as='h2' size='lg' className='my-8'>
				Currently Watching
			</Heading>
			<Grid templateColumns={'repeat(3, 1fr)'} pt={5} gap={5}>
				{myAnimes ? (
					<>
						{myAnimes.map((a) => (
							<Link href={'/animes/' + a.id} key={a.id}>
								<a>
									<AnimeCard key={a.id} data={a} />
								</a>
							</Link>
						))}
						<DummyCard />
					</>
				) : (
					<>
						<Stack className='flex'>
							<Skeleton height='200px' />
							<Skeleton height='200px' />
							<Skeleton height='200px' />
						</Stack>
					</>
				)}
			</Grid>
			<Heading as='h2' size='lg' className='mt-16 mb-8'>
				Need to Watch
			</Heading>
			<Grid templateColumns={'repeat(3, 1fr)'} pt={5} gap={5}>
				<DummyCard />
			</Grid>
		</Box>
	)
}

export default Index
