import React, { useState, useEffect } from 'react';
import { config } from '../../constants';
import DNCList from './DNCList'
import DNCNewForm from './DNCNewForm';
import DNCEditForm from './DNCEditForm';
import { IDnc, ITerritory, IUser } from '../../shared/interfaces';

interface IDNCsProps {
    currentUser: IUser;
}

const DNCs = ({currentUser}: IDNCsProps): JSX.Element => {
    const [territories, setTerritories] = useState<ITerritory[]>([])
    useEffect(() => {
        fetch(`${config.url.API_URL}/congregations/${currentUser.congregation.id}/territories`)
            .then(r => r.json())
            .then(d => setTerritories(d))
    }, [])

    const getDncs = () => {
        fetch(`${config.url.API_URL}/congregations/${currentUser.congregation.id}/dncs`)
                .then(r => r.json())
                .then(d => setAllDncs(d))
    }

    const [allDncs, setAllDncs] = useState([])
    useEffect(getDncs, [])

    const [dnc, setDnc] = useState<IDnc | undefined>()

    const [displayEdit, setDisplayEdit] = useState(false)
    const handleEditClick = (e: any, prevDnc: any) => {
        e.preventDefault()
        setDnc(prevDnc)
        setDisplayEdit(true)
    }
    const handleFinishEdit = () => {
        setDisplayEdit(false)
        getDncs()
        setDnc(undefined)
    }

    const [displayNew, setDisplayNew] = useState(false)
    const handleShowNewForm = (e: any) => {
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

    const sortedTerritories = territories.sort((a: ITerritory, b: ITerritory) => {return (a.name < b.name ? -1 : 1)});

    const [territoryId, setTerritoryId] = useState('0')
    const handleTerritoryChange = (e: any) => {
        setTerritoryId(e.target.value)
    }

    return(
        <>
            <DNCList sortedTerritories={sortedTerritories}
                     handleTerritoryChange={handleTerritoryChange}
                     territoryId={parseInt(territoryId, 10)}
                     allDncs={allDncs}
                     handleEditClick={handleEditClick}
                     currentUser={currentUser} />
            <br />
            {displayEdit && dnc &&  <DNCEditForm dnc={dnc}
                                                 handleClose={handleCloseForms}
                                                 handleFinishEdit={handleFinishEdit}
                                                 currentUser={currentUser} />}
            {displayNew && !displayEdit ? <DNCNewForm territoryId={parseInt(territoryId, 10)}
                                                      handleClose={handleCloseForms}
                                                      handleFinishCreate={handleFinishCreate}
                                                      currentUser={currentUser} />
                        :
                        territoryId !== "0" && !displayEdit && <button className="btn btn-primary" onClick={handleShowNewForm}>Add New DNC</button>
            }      
        </>
    )
}

export default DNCs;