const Person = ({ person, deletePerson }) => (
    <div>
        {person.name} {person.number}
        <button onClick={deletePerson}>delete</button>
    </div>
)

const Persons = ({ persons, filter, deletePerson }) => {
    const personsToShow = persons.filter(person =>
            person.name.toLowerCase().includes(filter.toLowerCase()
            ))

    return (
        <>
            {personsToShow.map(person =>
                <Person
                    key={person.id}
                    person={person}
                    deletePerson={() => deletePerson(person.id)} />
            )}
        </>
    )
}

export default Persons