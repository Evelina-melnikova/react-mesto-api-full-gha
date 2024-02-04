import React from 'react';

const Login = ({ onLogin }) => {

  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailValue && passwordValue) {
      onLogin({ emailValue, passwordValue });
    }
  }

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  }

  return (
    <div className='login'>
      <h1 className='login__title'>Вход</h1>
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
          <div className="login__container login__container_input">
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
        </div>
        <div className='login__container login__container_type-button'>
          <button
            className="login__submit-button"
            type='submit'>
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;