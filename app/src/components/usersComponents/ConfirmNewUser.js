import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { config } from '../../constants';


const ConfirmNewUser = (props) => {
    const history = useHistory()
    const { token } = useParams()

    const [ name, setName ] = useState('')
    const handleNameChange = (e) => {
        setName(e.currentTarget.value)
    }

    const [ password, setPassword ] = useState('')
    const handlePasswordChange = (e) => [
        setPassword(e.currentTarget.value)
    ]

    const [ confirmPassword, setConfirmPassword ] = useState('')
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    name,
                    password,
                    token
                }
            })
        }
        fetch(`${config.url.API_URL}/confirm`, configObj)
            .then(r => {
                if (!r.ok) { throw r }
                return r.json()
            })
            .then(d => {
                console.log(d)
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div id="confirm-user">
            <h1>Welcome to The Territory Counter</h1>
            <p>Thanks for confirming your email! We just need you to finish setting up your account, then you'll be ready to get started managing your territories and contacts.</p>

            <form onSubmit={handleSubmit}>
                <div className="input-row">
                    <label htmlFor="name">Your Full Name:</label>
                    <input type="text"
                           name="name"
                           value={name}
                           onChange={handleNameChange} />
                </div>
                <div className="input-row">
                    <label htmlFor="password">Password:</label>
                    <input type="password"
                           name="password"
                           value={password}
                           onChange={handlePasswordChange} />
                </div>
                <div className="input-row">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password"
                           name="comfirmPassword"
                           value={confirmPassword}
                           onChange={handleConfirmPasswordChange} />
                </div>
                <input type="submit" className="btn btn-primary" value="Create Account" />
            </form>
        </div>
    )
}

export default ConfirmNewUser;