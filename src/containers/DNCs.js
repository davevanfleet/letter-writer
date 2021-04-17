import React, { useState, useEffect } from 'react';
import { config } from '../constants';
import uuid from 'uuid';
import DNCList from '../components/DNCList'
import DNCNewForm from '../components/DNCNewForm';
import DNCEditForm from '../components/DNCEditForm';

const DNCs = (props) => {
    const [territories, setTerritories] = useState([])
    useEffect(() => {
        fetch(`${config.url.API_URL}/congregations/${props.currentUser.congregation_id}/territories`)
            .then(r => r.json())
            .then(d => setTerritories(d))
    }, [])

    const getDncs = () => {
        fetch(`${config.url.API_URL}/congregations/${props.currentUser.congregation_id}/dncs`)
                .then(r => r.json())
                .then(d => setAllDncs(d))
    }

    const [allDncs, setAllDncs] = useState([])
    useEffect(getDncs, [])

    const [dnc, setDnc] = useState('')

    const [displayEdit, setDisplayEdit] = useState(false)
    const handleEditClick = (e, prevDnc) => {
        e.preventDefault()
        setDnc(prevDnc)
        setDisplayEdit(true)
    }
    const handleFinishEdit = () => {
        setDisplayEdit(false)
        getDncs()
        setDnc('')
    }

    const [displayNew, setDisplayNew] = useState(false)
    const handleShowNewForm = (e) => {
        e.preventDefault()
        setDisplayNew(true)
    }

    const handleFinishCreate = () => {
        getDncs()
    }

    const handleCloseForms = () => {
        setDisplayEdit(false)
        setDisplayNew(false)
    }

    const sortedTerritories = territories.sort((a, b) => {return (a.name < b.name ? -1 : 1)}).map(t => <option key={uuid()} value={t.id}>{t.name}</option>)

    const [territoryId, setTerritoryId] = useState('0')
    const handleTerritoryChange = (e) => {
        setTerritoryId(e.target.value)
    }

    return(
        <>
            <DNCList sortedTerritories={sortedTerritories}
                     handleTerritoryChange={handleTerritoryChange}
                     territoryId={territoryId}
                     allDncs={allDncs}
                     handleEditClick={handleEditClick} />
            <br />
            {displayEdit && <DNCEditForm dnc={dnc}
                                         handleClose={handleCloseForms}
                                         handleFinishEdit={handleFinishEdit}
                                         currentUser={props.currentUser} />}
            {displayNew && !displayEdit ? <DNCNewForm territoryId={territoryId}
                                                      handleClose={handleCloseForms}
                                                      handleFinishCreate={handleFinishCreate}
                                                      currentUser={props.currentUser} />
                        :
                        territoryId !== "0" && !displayEdit && <button className="btn btn-primary" onClick={handleShowNewForm}>Add New DNC</button>
            }      
        </>
    )
}

export default DNCs;