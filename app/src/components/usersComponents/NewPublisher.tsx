import React, { useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { config } from '../../constants';

const NewPublisher = (): JSX.Element => {
  const { currentUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const handleNameChange = (e: any) => {
    setName(e.currentTarget.value);
  };

  const [email, setEmail] = useState('');
  const handleEmailChange = (e: any) => {
    setEmail(e.currentTarget.value);
  };

  const [role, setRole] = useState('Publisher');
  const handleRoleChange = (e: any) => {
    setRole(e.currentTarget.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const configObj = {
      method: 'POST',
      headers: {
        Accepts: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          name,
          email,
          role,
        },
      }),
    };
    fetch(`${config.url.API_URL}/congregations/${currentUser!.congregation.id}/users`, configObj)
      .then((r) => {
        if (!r.ok) {
          throw r;
        }
        return r.json();
      })
      .then((d) => {
        console.log(d);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div id="new-publisher-form">
      <h1>Add Publisher</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <label htmlFor="name">Publisher Name*:</label>
          <input type="text" name="name" value={name} onChange={handleNameChange} />
        </div>
        <div className="input-row">
          <label htmlFor="email">Email:</label>
          <input type="text" name="email" value={email} onChange={handleEmailChange} />
        </div>
        <hr />
        <h2 style={{ textAlign: 'left' }}>Role:</h2>
        <div className="radio-row">
          <input
            type="radio"
            name="role1"
            value="Publisher"
            onChange={handleRoleChange}
            checked={role === 'Publisher'}
          />
          <label htmlFor="role1">Publisher (can only see their assigned territories)</label>
        </div>
        <div className="radio-row">
          <input
            type="radio"
            name="role2"
            value="Admin"
            onChange={handleRoleChange}
            checked={role === 'Admin'}
          />
          <label htmlFor="role2">
            Admin (can see all territories, make changes to records, and manage user accounts)
          </label>
        </div>
        <input type="submit" className="btn btn-primary" value="Create Account" />
      </form>
    </div>
  );
};

export default NewPublisher;
