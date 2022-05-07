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
import ListCard from '../components/discover/ListCard'
import { Anime } from '../utils/types/anime'

const Discover = () => {
	const [input, setInput] = useState<string>()
	const [options, setOptions] = useState<null | Anime[]>()
	const [error, setError] = useState<string>('')

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
		console.log(anime)
		if (!anime.length) setError(`I couldn't find any Animes named ${input}.`)
		const options = anime.map((a: { show: Anime }) => a.show)
		setOptions(options)
	}
	return (
		<Box className='mx-48'>
			<Heading as='h1' className='mt-16 mb-10'>
				Discover
			</Heading>
			<Divider className='mb-8' />
			<form onSubmit={getData}>
				<FormLabel htmlFor='search'>Find a new Anime:</FormLabel>
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
						<ListCard key={o.id} anime={o} />
					))}
				</ul>
			</Box>
		</Box>
	)
}

export default Discover
