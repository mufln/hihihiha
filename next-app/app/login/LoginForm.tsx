import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm () {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();

  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setName(name);
    setNameError(!name);
  };

  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setPassword(password);
    setPasswordError(!password);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name && password) {
      setName('');
      setNameError(false);
      setPassword('');
      setPasswordError(false);
      console.log(name, password);
      fetch("http://127.0.0.1:5000/login/", {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ login: name, password: password })
      })
      .then((response) => response.json())
      .then((data) => {
        // Handle login response
        router.push('/main');
      })
      .catch((error) => {
        // Handle login error
        console.error(error);
      });
      return;
    }

    setNameError(!name);
    setPasswordError(!password);
  };

  return (
    <form className="login" onSubmit={submitHandler}>
      <input 
        value={name}
        onChange={nameChangeHandler}
        type="text" 
        className="nickname" 
        id="name" 
        placeholder="Логин" 
        required
      />
      {nameError ? (
        <div className='error'>! Заполните поле</div>
      ) : null}
      <input 
        value={password}
        onChange={passwordChangeHandler}
        type="password" 
        className="password" 
        id="password" 
        placeholder="Пароль" 
        required
      />
      {passwordError ? (
        <div className='error'>! Заполните поле</div>
      ) : null}
      <button id="enter" className="enter" type="submit">Войти</button>
    </form>
  );
};