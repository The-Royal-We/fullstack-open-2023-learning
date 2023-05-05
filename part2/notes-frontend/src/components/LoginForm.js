import PropTypes from 'prop-types';
import { useState } from 'react';

const LoginForm = ({ handleLogin }) => {
  const login = (e) => {
    e.preventDefault();
    handleLogin({ username, password });
    setPassword('');
    setUsername('');
  };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form onSubmit={login}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target: { value } }) => setUsername(value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
