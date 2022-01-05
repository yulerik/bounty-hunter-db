import React from 'react'

function NewBountyForm(props) {
    const {firstName, lastName, living, bountyAmount, type} = props.state

    return (
        <form style={{display: props.state ? 'none' : 'grid'}} id='newBountyForm' name='newBounty' onSubmit={props.onSubmit}>
            <label>First Name: </label>
            <input
                type='text'
                name='firstName'
                value={firstName}
                placeholder='First Name'
                onChange={props.onChange}
                required
            />
            <label>Last Name: </label>
            <input
                type='text'
                name='lastName'
                value={lastName}
                placeholder='Last Name'
                onChange={props.onChange}
                required
            />
            <label>Living: </label>
            <select name='living' onChange={props.onChange} required>
                <option value=''>is the bounty alive</option>
                <option value='true'>true</option>
                <option value='false'>false</option>
            </select>
            <label>Bounty Amount: </label>
            <input
                type='number'
                name='bountyAmount'
                value={bountyAmount}
                placeholder='price for bounty'
                onChange={props.onChange}
                min='0'
                required
            />
            <label>Type: </label>
            <select name='type' onChange={props.onChange} required>
                <option value=''>the dark or light side</option>
                <option value='jedi'>jedi</option>
                <option value='sith'>sith</option>
            </select>
            <button onSubmit={props.handleSubmit} >Add Bounty</button>
        </form>
    )
}

export default NewBountyForm