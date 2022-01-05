import React, {useEffect, useState} from 'react'
import axios from 'axios'

function EditForm(props) {
    const blankInputs = {
        firstName: '',
        lastName: '',
        living: '',
        bountyAmount: 0,
        type: ''
    }
    const [inputs, setInputs] = useState([])
    const [newInputs, setNewInputs] = useState(blankInputs)

    function handleSubmit(event) {
        event.preventDefault()
        console.log()
        // change empty values, ie no inputs, to old values before put call
        if (newInputs.firstName === '') {
            newInputs.firstName = inputs.firstName
        } 
        if (newInputs.lastName === '') {
            newInputs.lastName = inputs.lastName
        } 
        if (newInputs.type === '') {
            newInputs.type = inputs.type
        } 
        if (newInputs.bountyAmount === 0) {
            newInputs.bountyAmount = inputs.bountyAmount
        }
        if (newInputs.living === '') {
            newInputs.living = inputs.living
        }
        // put call with new input objects, update state after successfully put call, hide display for editForm
        axios.put(`/bounty/${inputs._id}`, newInputs)
            .then(res => {
                props.updateBounties()
                console.log(res.data)
                props.editState(false)
            })
            .catch(err => console.log(err))
        // reset inputs for edit Form
        setNewInputs(blankInputs)
        const editBountyForm = document.editBounty
        const {firstName, lastName, living, bountyAmount, type} = editBountyForm
        firstName.value = ''
        lastName.value = ''
        living.value = ''
        bountyAmount.value = ''
        type.value = ''

    }

    function handleChange(event){
        const {name, value} = event.target
        setNewInputs(prevInputs => ({...prevInputs, [name]: value}))
    }

    useEffect(() => {
        setInputs(props.inputs)
    }, [props])

    return (
        <div style={{display: !props.state ? 'none' : 'block'}} id='edit-form'>
            <form id='editBountyForm' name='editBounty' onSubmit={handleSubmit}>
                <label>Change first name to:</label>
                <input
                    type='text'
                    name='firstName'
                    value={newInputs.firstName}
                    placeholder={props.inputs.firstName}
                    onChange={handleChange}
                />
                <br></br>
                <label>Change last name to:</label>
                <input
                    type='text'
                    name='lastName'
                    value={newInputs.lastName}
                    placeholder={props.inputs.lastName}
                    onChange={handleChange}
                />
                <br></br>
                <label>Switch living to:</label>
                <select name='living' onChange={handleChange}>
                    <option value=''>is the bounty alive</option>
                    <option value='true'>true</option>
                    <option value='false'>false</option>
                </select>
                <br></br>
                <label>Change bounty amount to:</label>
                <input
                    type='number'
                    name='bountyAmount'
                    value={newInputs.bountyAmount}
                    placeholder={props.inputs.bountyAmount}
                    onChange={handleChange}
                />
                <br></br>
                <label>Switch type to:</label>
                <select name='type' onChange={handleChange}> 
                    <option value=''>the dark or light side</option>
                    <option value='jedi'>jedi</option>
                    <option value='sith'>sith</option>
                </select>
                <button onSubmit={props.handleSubmit} >Update Bounty</button>
            </form>
        </div>
    )
}

export default EditForm