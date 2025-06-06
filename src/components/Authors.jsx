import { useQuery } from "@apollo/client"

import BirthYear from "./BirthYear"

import { ALL_AUTHORS } from "../queries"

const Authors = () => {

  const result = useQuery(ALL_AUTHORS, {})
  const authors = result.data ? result.data.allAuthors : []

  console.log('result',)

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthYear authors={authors} />
    </div>
  )
}

export default Authors
