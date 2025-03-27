import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const BirthYear = ({ authors }) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    console.log('BirthYear.authors', authors)

    const [setBirthYear] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            console.log('error', error)
        }
    })


    const submit = async (event) => {
        event.preventDefault()
        console.log('update author')

        const setBornTo = parseInt(born, 10)

        const variables = {
            name, setBornTo
        }

        console.log('variables', variables)

        try {
            await setBirthYear({
                variables: variables
            })
        } catch (error) {
            console.log('error adding book', error)
        }

        setName('')
        setBorn('')
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    name
                    <select value={name} onChange={({ target }) => setName(target.value)}>{
                        authors.map((author) => (
                            <option key={author.name} value={author.name}>{author.name}</option>
                        ))
                    }
                    </select>
                </div>
                <div>
                    born
                    <input
                        type="number"
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default BirthYear