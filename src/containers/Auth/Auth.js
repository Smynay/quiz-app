import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import './Auth.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { validate, validateForm } from '../../form/formFramework';
import { auth } from '../../store/actions/auth';

function Auth(props) {
  const [formControls, setFormControls] = useState({
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Некорректный Email',
      valid: false,
      touched: false,
      validation: { required: true, email: true },
    },
    password: {
      value: '',
      type: 'password',
      label: 'Пароль',
      errorMessage: 'Некорректный пароль',
      valid: false,
      touched: false,
      validation: { required: true, minLength: 6 },
    },
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const loginHandler = useCallback(() => {
    props.auth(formControls.email.value, formControls.password.value, true);
    //eslint-disable-next-line
  }, [formControls.password.value, formControls.email.value]);

  const registerHandler = useCallback(() => {
    props.auth(formControls.email.value, formControls.password.value, false);
    //eslint-disable-next-line
  }, [formControls.password.value, formControls.email.value]);

  const onChangeHandler = (event, controlName) => {
    const fC = { ...formControls };
    const control = { ...fC[controlName] };
    control.value = event.target.value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);

    fC[controlName] = control;

    setIsFormValid(validateForm(fC));

    setFormControls({ ...fC });
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const renderInputs = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={controlName.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(event) => onChangeHandler(event, controlName)}
        />
      );
    });
  };

  return (
    <div className="Auth">
      <div>
        <h1>Авторизация</h1>

        <form onSubmit={submitHandler} className="AuthForm">
          {renderInputs()}

          <Button type="success" onClick={loginHandler} disabled={!isFormValid}>
            Войти
          </Button>
          <Button
            type="primary"
            onClick={registerHandler}
            disabled={!isFormValid}
          >
            Регистрация
          </Button>
        </form>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) =>
      dispatch(auth(email, password, isLogin)),
  };
}

export default connect(null, mapDispatchToProps)(Auth);
