import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IAssignment } from '../../shared/interfaces';
import { config } from '../../constants';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface ICheckInModalProps {
  assignment: IAssignment;
  congregationId: number;
  territoryId: number;
  handleClose: () => void;
}

const CheckInModal = ({
  assignment,
  congregationId,
  territoryId,
  handleClose,
}: ICheckInModalProps): JSX.Element => {
  const [checkIn, setCheckIn] = useState('');
  const handleCheckInChange = (e: any) => {
    setCheckIn(e.currentTarget.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const configObj = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify({
        assignment: {
          ...assignment,
          checked_in: checkIn,
        },
      }),
    };
    fetch(
      `${config.url.API_URL}/congregations/${congregationId}/territories/${territoryId}/assignments/${assignment.id}`,
      configObj,
    )
      .then((r) => {
        if (!r.ok) {
          throw r;
        }
        return r.json();
      })
      .then((d) => {
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div id="assignment-modal">
      <div id="assignment-modal-body">
        <FontAwesomeIcon
          className="close-btn"
          icon={faTimesCircle}
          size="3x"
          onClick={handleClose}
        />
        <h1>Check In Territory</h1>
        <p>
          Publisher: <em>{assignment.publisher}</em>
        </p>
        <p>
          Checked Out: <em>{assignment.checked_out}</em>
        </p>
        <div className="input-row">
          <label htmlFor="date">Check In Date:</label>
          <input type="date" name="date" value={checkIn} onChange={handleCheckInChange} />
        </div>
        <div>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Check In
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckInModal;
