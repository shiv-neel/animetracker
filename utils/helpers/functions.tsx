import axios from 'axios'
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../auth/firebase'
import { Anime } from '../types/anime'

export const addAnime = async (uid: string, anime: Anime) => {
	console.log(anime.id)
	if (uid)
		await updateDoc(doc(db, 'users', uid), {
			animes: arrayUnion(anime.id),
		})
}

export interface UserDocData {
	animes?: number[]
	displayName?: string
	lastLogin?: number
}

export const getMyAnimeIds = async (
	uid: string | undefined
): Promise<number[] | undefined> => {
	if (uid) {
		const docRef = doc(db, 'users', uid)
		const animes = await getDoc(docRef)
		const res = animes.data() as UserDocData
		const animeIds = res.animes
		return animeIds
	}
}
