import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface ICheckboxProps {
  id: number;
}

const CheckBox = ({ id }: ICheckboxProps): JSX.Element => {
  const [display, setDisplay] = useState(false);
  const handleClick = (e: any) => {
    e.preventDefault();
    setDisplay((prevState) => !prevState);
  };

  return (
    <td id={`contact-${id}`} onClick={handleClick}>
      {display ? <FontAwesomeIcon icon={faCheck} /> : null}
    </td>
  );
};

export default CheckBox;
