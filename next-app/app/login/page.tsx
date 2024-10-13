'use client'
import React, { use } from 'react';
import { useState } from 'react';
import '../../styles/login.css';
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
// import { Link } from 'react-router-dom';

export default function Login() {
  const [loginOpen, setLoginOpen] = useState(true);
    return (
    <div className="login-wrapper mx-auto my-auto">
      <div className="w-96">
        <img src="/kokocgroup_logo_horizontal_black_background.jpg"/>
      </div>
      {loginOpen ? 
        <h2>Авторизация</h2> :
        <h2>Регистрация</h2>}
      {loginOpen ? 
        <LoginForm></LoginForm> : 
        <RegisterForm></RegisterForm>}
      {loginOpen ?
        <div className="signin">
          Нет учётной записи? 
          <button className='register-href' onClick={() => setLoginOpen(false)}>Регистрация</button>
        </div> :
        <div className="signin">
          У Вас уже есть аккаунт? 
          <button className='register-href' onClick={() => setLoginOpen(true)}>Войти</button>
        </div>
         }
    </div> 
    );
  }
