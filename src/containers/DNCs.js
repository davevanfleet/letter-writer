import React, { useState, useEffect } from 'react';
import { config } from '../constants';
import uuid from 'uuid';
import DNCList from '../components/DNCList'
import DNCNewForm from '../components/DNCNewForm';
import DNCEditForm from '../components/DNCEditForm';

const DNCs = (props) => {
    const [territories, setTerritories] = useState([])
    useEffect(() => {
        fetch(`${config.url.API_URL}/territories`)
            .then(r => r.json())
            .then(d => setTerritories(d))
    }, [])

    const getDncs = () => {
        fetch(`${config.url.API_URL}/dncs`)
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

    const handleFinishCreate = () => {
        getDncs()
    }

    const sortedTerritories = territories.sort((a, b) => {return (a.name < b.name ? -1 : 1)}).map(t => <option key={uuid()} value={t.id}>{t.name}</option>)

    return(
        <>
            <DNCList sortedTerritories={sortedTerritories} allDncs={allDncs} handleEditClick={handleEditClick} />
            <br />
            {displayEdit ? <DNCEditForm dnc={dnc} handleFinishEdit={handleFinishEdit} /> : <DNCNewForm sortedTerritories={sortedTerritories} handleFinishCreate={handleFinishCreate} />  }      
        </>
    )
}

export default DNCs;