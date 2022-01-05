import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import NewBountyForm from './components/NewBountyForm'
import Bounty from './components/Bounty'
import EditForm from './components/EditForm'
import SortAndFilter from './components/SortAndFilter'
import './styles.css'


function App(props) {
    const blankInputs = {
        firstName: '',
        lastName: '',
        living: '',
        bountyAmount: 0,
        type: ''
    }
    const [bounties, setBounties] = useState([])
    const [inputs, setInputs] = useState(blankInputs)
    const [editInputs, setEditInputs] = useState(blankInputs)
    const [displayEdit, setDisplay] = useState(false)
    const [filter, setFilter] = useState([])

    function handleChange(event){
        const {name, value} = event.target
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    }
    function handleSubmit(event) {
        event.preventDefault()
        axios.post('/bounty', inputs)
            .then(res => {
                console.log(res)
                updateBounties()
            })
            .catch(err => console.log(err))
        // setBounties(prevBounties => [...prevBounties, inputs])
        setInputs(blankInputs)
        const newBountyForm = document.newBounty
        const {firstName, lastName, living, bountyAmount, type} = newBountyForm
        firstName.value = ''
        lastName.value = ''
        living.value = ''
        bountyAmount.value = ''
        type.value = ''
    }
    function handleEdit(event) {
        if (displayEdit) {
            setDisplay(false)
            setEditInputs(blankInputs)
            const editBountyForm = document.editBounty
            const {firstName, lastName, living, bountyAmount, type} = editBountyForm
            firstName.value = ''
            lastName.value = ''
            living.value = ''
            bountyAmount.value = ''
            type.value = ''
        } else {
            setDisplay(true)
            const currentBounty = bounties.find(bounty => bounty._id === event.target.parentElement.id)
            setEditInputs(currentBounty)
        }
    }
    function updateBounties() {
        axios.get('/bounty')
            .then(res => setBounties(res.data))
            .catch(error => console.log(error))
    }
    function onDelete(event) {
        axios.delete(`/bounty/${event.target.parentElement.id}`)
            .then(res => {
                console.log(res.data)
                updateBounties()
            })
            .catch(err => console.log(err))
    }  
    function filterChange(event) {
        const {value} = event.target
        if (value === '') {
            updateBounties()
        } else {
            if (value === 'sith' || value === 'jedi') {
                axios.get(`/search?type=${value}`)
                    .then(res => setBounties(res.data))
                    .catch(err => console.log(err))
            }
            else if (value === 'true' || value === 'false') {
                axios.get(`/search?living=${value}`)
                    .then(res => setBounties(res.data))
                    .catch(err => console.log(err))
            }
        }
    }
    function sortChange(event) {
        const {value} = event.target
        if (value === '') {
            updateBounties()
        }
        else if (value === 'firstNameA') {
            const sorted = bounties
            sorted.sort((a, b) => {
                const first = a.firstName.toUpperCase()
                const second = b.firstName.toUpperCase()
                if (first < second) return -1
                else if (first > second) return 1
                else return 0
            })
            setFilter(sorted)
        }
        else if (value === 'firstNameZ') {
            const sorted = bounties
            sorted.sort((a, b) => {
                const first = a.firstName.toUpperCase()
                const second = b.firstName.toUpperCase()
                if (first > second) return -1
                else if (first < second) return 1
                else return 0
            })
            setFilter(sorted)
        }
        else if (value === 'lastNameA') {
            const sorted = bounties
            sorted.sort((a, b) => {
                const first = a.lastName.toUpperCase()
                const second = b.lastName.toUpperCase()
                if (first < second) return -1
                else if (first > second) return 1
                else return 0
            })
            setFilter(sorted)
        }
        else if (value === 'lastNameZ') {
            const sorted = bounties
            sorted.sort((a, b) => {
                const first = a.lastName.toUpperCase()
                const second = b.lastName.toUpperCase()
                if (first > second) return -1
                else if (first < second) return 1
                else return 0
            })
            setFilter(sorted)
        }
    }   

    useEffect(() => {
        updateBounties()
        // axios.get('/bounty')
        //     .then(res => setBounties(res.data))
        //     .catch(error => console.log(error))
    }, [])

    return (
        <>
            <div id='forms'>
                <NewBountyForm 
                    onChange={handleChange} 
                    onSubmit={handleSubmit} 
                    bounties={bounties} 
                    state={inputs, setInputs, bounties, setBounties, displayEdit}
                />
                <EditForm 
                    updateBounties={updateBounties} 
                    state={displayEdit} editState={setDisplay} 
                    inputs={editInputs} 
                />
            </div>
            <SortAndFilter filterChange={filterChange} sortChange={sortChange} />
            <div id='bounties'>
                {bounties.map(bounty => 
                    <Bounty {...bounty} 
                        onDelete={onDelete}
                        onEdit={handleEdit} 
                        key={bounty._id} 
                        filter={props.filter}
                    />
                )}
            </div>
        </>
    )
}

export default App