import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [repeatpassword, setRepeatpassword] = useState('');
  const [repeatpasswordError, setRepeatpasswordError] = useState(false);
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

  const repeatPasswordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const repeatpassword = event.target.value;
    setRepeatpassword(repeatpassword);
    setRepeatpasswordError(!repeatpassword);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name && password && repeatpassword) {
      setName('');
      setNameError(false);
      setPassword('');
      setPasswordError(false);
      setRepeatpassword('');
      setRepeatpasswordError(false);
      console.log(name, password, repeatpassword);
      fetch("http://127.0.0.1:5000/register/", {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ login: name, password: password, repeatpassword: repeatpassword })
      })
      .then((response) => response.json())
      .then((data) => {
        // Handle register response
        router.push('/main');
      })
      .catch((error) => {
        // Handle register error
        console.error(error);
      });
      return;
    }

    setNameError(!name);
    setPasswordError(!password);
    setRepeatpasswordError(!repeatpassword);
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
      <input 
        value={repeatpassword}
        onChange={repeatPasswordChangeHandler}
        type="password" 
        className="repeat-password" 
        id="repeat-password" 
        placeholder="Повторите пароль" 
        required
      />
      {repeatpasswordError ? (
        <div className='error'>! Заполните поле</div>
      ) : null}
      <button id="enter" className="enter" type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default RegisterForm;