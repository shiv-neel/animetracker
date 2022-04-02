export const CSVArrToString = (arr: string[] | string) => {
	if (typeof arr === 'string') return arr
	const res = ''
	const reducer = arr.reduce((prev, curr) => `${prev}, ${curr}`, res)
	// prev is everything in res, curr is current item. Concatenation gets stored in res
	return reducer.slice(2)
}
