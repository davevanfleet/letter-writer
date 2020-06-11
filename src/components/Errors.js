import React from 'react';

const Errors = (props) => {
    return (
        <div className="alert alert-danger">
            {props.error}
        </div>
    )
}

export default Errors;