import {
	Box,
	Button,
	Divider,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useAuth } from '../auth/user'
import ListCard from '../components/discover/ListCard'
import { getMyAnimeIds } from '../utils/helpers/functions'
import { Anime } from '../utils/types/anime'

const Discover = () => {
	const [input, setInput] = useState<string>()
	const [options, setOptions] = useState<null | Anime[]>()
	const [error, setError] = useState<string>('')
	const [inList, setInList] = useState<boolean>(false)
	const user = useAuth().user

	const getData = async (e: any) => {
		setError('')
		e.preventDefault()
		const res = await axios.get(
			`https://api.tvmaze.com/search/shows?q=${input}`
		)
		const anime = res.data.filter(
			(sh: { show: { language: string; type: string } }) =>
				sh.show.language.toUpperCase() === 'JAPANESE' &&
				sh.show.type.toUpperCase() === 'ANIMATION'
		)
		console.log(await existsInList(anime[0].id, user!.uid))
		if (await existsInList(anime[0].show.id, user!.uid)) setInList(true)
		console.log(await existsInList(anime[0].id, user!.uid))
		if (!anime.length) setError(`I couldn't find any Animes named ${input}.`)
		const options = anime.map((a: { show: Anime }) => a.show)
		setOptions(options)
	}

	const existsInList = async (id: number, uid: string) => {
		const animeIds = await getMyAnimeIds(uid)
		return !!animeIds?.find((a) => a === id)
	}

	return (
		<Box className='mx-48'>
			<Heading as='h1' className='mt-16 mb-10'>
				Discover
			</Heading>
			<Divider className='mb-8' />
			<form onSubmit={getData}>
				<p className='text-lg'>Find a new Anime:</p>
				<Box className='flex items-center content-center my-5'>
					<InputGroup className='gap-5'>
						<InputLeftElement>
							<FaSearch className='text-blue-400' />
						</InputLeftElement>

						<Input
							id='search'
							type='text'
							onChange={(e) => setInput(e.target.value)}
							size='md'
							w={'2xl'}
							placeholder='example: Attack on Titan'
						/>
						<Button type='submit' colorScheme={'twitter'} minWidth={24}>
							Search
						</Button>
					</InputGroup>
				</Box>
			</form>
			<p className='text-red-400'>{error}</p>
			<Box>
				<ul>
					{options?.map((o) => (
						<ListCard key={o.id} anime={o} existsInList={inList} />
					))}
				</ul>
			</Box>
			<p className='mt-16 mb-10 text-3xl'>Most Searched Today</p>
			<Divider className='mb-8' />
		</Box>
	)
}

export default Discover
