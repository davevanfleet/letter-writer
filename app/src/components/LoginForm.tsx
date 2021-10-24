import React, { useState } from 'react';

interface ILoginFormProps {
  login: () => void;
}

const LoginForm = ({ login }: ILoginFormProps): JSX.Element => {
  const [username, setUsername] = useState('');
  const handleUsernameChange = (e: any) => {
    setUsername(e.currentTarget.value);
  };

  const [password, setPassword] = useState('');
  const handlePasswordChange = (e: any) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <label>
          Username:{' '}
          <input name="username" type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:{' '}
          <input name="password" type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default LoginForm;
