import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IUser } from '../../shared/interfaces';
import { config } from '../../constants';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface IDNCNewFormProps {
  territoryId: number;
  currentUser: IUser;
  handleFinishCreate: () => void;
  handleClose: () => void;
}

const DNCNewForm = ({
  territoryId,
  currentUser,
  handleFinishCreate,
  handleClose,
}: IDNCNewFormProps): JSX.Element => {
  const [address, setAddress] = useState('');
  const handleAddressChange = (e: any) => {
    setAddress(e.target.value);
  };

  const [name, setName] = useState('');
  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const [publisher, setPublisher] = useState('');
  const handlePublisherChange = (e: any) => {
    setPublisher(e.target.value);
  };

  const [description, setDescription] = useState('');
  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const today = new Date();
  let month;
  if (today.getMonth() < 9) {
    month = `0${today.getMonth() + 1}`;
  } else {
    month = `${today.getMonth() + 1}`;
  }
  const [date, setDate] = useState(`${today.getFullYear()}-${month}-${today.getDate()}`);
  const handleDateChange = (e: any) => {
    setDate(e.target.value);
  };

  // const [territoryId, setTerritoryId] = useState('0')
  // const handleTerritoryChange = (e) => {
  //     setTerritoryId(e.target.value)
  // }

  const submitDnc = (e: any) => {
    e.preventDefault();
    const configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accepts: 'application/json',
      },
      body: JSON.stringify({
        dnc: {
          address,
          territory_id: territoryId,
          name,
          publisher,
          notes: description,
          date,
        },
      }),
    };
    fetch(
      `${config.url.API_URL}/congregations/${currentUser.congregation.id}/territories/${territoryId}/dncs`,
      configObj,
    )
      .then((r) => r.json())
      .then((d) => {
        setAddress('');
        handleFinishCreate();
      });
  };

  return (
    <div className="dnc-form">
      <h3>Add New Do-Not-Call</h3>
      <form onSubmit={(e) => submitDnc(e)}>
        <div className="input-row">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => handleAddressChange(e)}
          />
        </div>
        <div className="input-row">
          <label htmlFor="name">DNC Name:</label>
          <input type="text" name="name" value={name} onChange={(e) => handleNameChange(e)} />
        </div>
        <div className="input-row">
          <label htmlFor="publisher">Publisher:</label>
          <input
            type="text"
            name="publisher"
            value={publisher}
            onChange={(e) => handlePublisherChange(e)}
          />
        </div>
        <div className="input-row">
          <label htmlFor="notes">Notes:</label>
          <input
            type="text"
            name="notes"
            value={description}
            onChange={(e) => handleDescriptionChange(e)}
          />
        </div>
        <div className="input-row">
          <label>Date:</label>
          <input type="date" name="date" value={date} onChange={(e) => handleDateChange(e)} />
        </div>
        <input type="submit" className="btn btn-primary" value="Add DNC" />
      </form>

      <FontAwesomeIcon icon={faTimesCircle} onClick={handleClose} />
    </div>
  );
};

export default DNCNewForm;
