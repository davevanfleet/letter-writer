import React from 'react';

const Errors = (props) => {
    return (
        <div className="alert alert-danger">
            {props.error.message}
        </div>
    )
}

export default Errors;