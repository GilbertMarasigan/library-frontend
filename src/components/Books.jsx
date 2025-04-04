import { useState } from "react"
import { useQuery, useSubscription } from "@apollo/client"

import { ALL_BOOKS, ALL_GENRES, BOOK_ADDED } from "../queries"

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const Books = () => {

  const [genre, setGenre] = useState(null)

  const { data: genresData } = useQuery(ALL_GENRES)

  const { data, refetch } = useQuery(ALL_BOOKS, {
    variables: genre ? { genre } : {},
  })

  console.log('data', data)

  const books = data ? data.allBooks : []

  const allGenres = genresData ? genresData.allGenres : []

  console.log('genresList', genresData)

  const handleGenreChange = (newGenre) => {
    setGenre(newGenre)
    refetch({ genre: newGenre })
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log(data)
      const addedBook = data.data.bookAdded
      console.log('added', addedBook)
      alert(`added Book ${addedBook.title}`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })


  return (
    <div>
      <h2>books</h2>
      in genre <b>{genre ? genre : 'all genres'}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allGenres.map((genre, index) => (
        <button key={index} onClick={() => handleGenreChange(genre)}>{genre}</button>
      ))}
      <button onClick={() => handleGenreChange(null)}>all genres</button>
    </div>
  )
}

export default Books
