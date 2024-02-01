import React from "react";
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {

  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister({ emailValue, passwordValue });
  };

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  }

  return (
    <div className='register'>
      <h1 className='login__title'>Регистрация</h1>
      <form className='login__form'
       onSubmit={handleSubmit}>
        <div className="login__container login__container_input">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="login__input login__input_type_email"
            required=""
            value={emailValue ?? ''}
            onChange={handleEmailChange}
          />
          <span
            className="login-error"
          />
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            className="login__input login__input_type_password"
            required=""
            value={passwordValue ?? ''}
            onChange={handlePasswordChange}
          />
          <span
            className="login-error"
          />
        </div>
        <div className='login__container login__container_type-button'>
          <button
            className="login__submit-button"
            type='submit'>
            Зарегистрироваться
          </button>
          <p className='login__caption'>
            Уже зарегистрированы?
            <Link to='/sign-in' className='login__caption login__link'> Войти</Link>
          </p>
        </div>
      </form>
      </div>

      );
};

      export default Register;