import { useState } from "react"
import { useQuery } from "@apollo/client"

import { ALL_BOOKS } from "../queries"

const Books = () => {

  const [genre, setGenre] = useState(null)

  const { data, loading, error } = useQuery(ALL_BOOKS, {
    variables: genre ? { genre } : {},
  })

  console.log('data', data)

  const books = data ? data.allBooks : []

  const allGenres = Array.from(new Set(books.flatMap((book) => book.genres)));

  console.log('allGenres', allGenres)


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
        <button key={index} onClick={() => setGenre(genre)}>{genre}</button>
      ))}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books
