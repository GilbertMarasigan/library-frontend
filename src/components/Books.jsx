import { useState } from "react"
import { useQuery } from "@apollo/client"

import { ALL_BOOKS } from "../queries"

const Books = () => {

  const [genre, setGenre] = useState(null)

  const result = useQuery(ALL_BOOKS)

  console.log('result', result)

  const books = result.data ? result.data.allBooks : []

  const allGenres = Array.from(new Set(books.flatMap((book) => book.genres)));

  console.log('allGenres', allGenres)

  const filteredBooks = genre
    ? books.filter((book) => book.genres.includes(genre))
    : books;

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
          {filteredBooks.map((a) => (
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
