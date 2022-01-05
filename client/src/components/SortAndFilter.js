import React from 'react'

function SortAndFilter(props) {




    return (
        <div id='sort-filter'>
            <select name='filter' onChange={props.filterChange}>
                <option value=''>filter by:</option>
                <option name='type' value='jedi'>light side</option>
                <option name='type' value='sith'>dark side</option>
                <option name='living' value='true'>alive</option>
                <option name='living' value='false'>deceased</option>
            </select>
            <select name='sort' onChange={props.sortChange}>
                <option value=''>sort by:</option>
                <option value='firstNameA' >First Name (a - z)</option>
                <option value='firstNameZ' >First Name (z - a)</option>
                <option value='lastNameA'>Last Name (a - z)</option>
                <option value='lastNameZ'>Last Name (z - a)</option>
                <option value='bountyAmountMin'>Bounty Amount (min - max)</option>
                <option value='bountyAmountMax'>Bounty Amount (max - min)</option>
            </select>
        </div>
    )
}

export default SortAndFilter