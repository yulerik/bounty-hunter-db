import React from 'react'
import axios from 'axios'

function Bounty(props) {
    const living = props.living ? 'alive' : 'deceased'

    return (
        <div id={props._id} className='bounty'>
            <h2>{props.firstName} {props.lastName} <span style={{fontSize:'14px'}}>{props.type} : {living}</span></h2>
            <h3>Bounty Amount: {props.bountyAmount}</h3>
            <button onClick={props.onEdit}>Edit Bounty</button> <br></br>
            <button onClick={props.onDelete}>Delete Bounty</button>
            <hr></hr>
        </div>
    )
}

export default Bounty