import React from 'react';

interface IErrorsProps {
  error: {
    message: string;
  };
}

const Errors = ({ error }: IErrorsProps): JSX.Element => (
  <div className="alert alert-danger">{error.message}</div>
);

export default Errors;
