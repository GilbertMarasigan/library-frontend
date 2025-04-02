import { useQuery } from "@apollo/client"

import { ALL_BOOKS, CURRENT_USER } from "../queries"

const Books = () => {

    const { data: userData, loading: userLoading } = useQuery(CURRENT_USER)

    const genre = userData?.me?.favoriteGenre;

    const { data: bookData, loading: bookLoading } = useQuery(ALL_BOOKS, {
        variables: { genre },
        skip: !genre,
    })

    if (userLoading) return <p>Loading user data...</p>
    if (bookLoading) return <p>Loading books...</p>

    const books = bookData ? bookData.allBooks : [];

    return (
        <div>
            <h2>books</h2>
            in genre <b>{genre ? genre : ''}</b>
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
        </div>
    )
}

export default Books
