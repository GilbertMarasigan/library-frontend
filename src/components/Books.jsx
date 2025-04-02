import { useState } from "react"
import { useQuery } from "@apollo/client"

import { ALL_BOOKS, ALL_GENRES } from "../queries"

const Books = () => {

  const [genre, setGenre] = useState(null)

  const { data: genresData } = useQuery(ALL_GENRES)

  const { data, loading, error, refetch } = useQuery(ALL_BOOKS, {
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
