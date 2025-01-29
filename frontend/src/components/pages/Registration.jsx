import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import '../style/Registration.css'

const Registration = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const validateUsername = (value) => {
    const regex = /^[a-zA-Z][a-zA-Z0-9]{3,19}$/;
    return regex.test(value) || "Только латинские буквы и цифры, первый символ — буква, длина от 4 до 20 символов.";
  };

  const validatePassword = (value) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(value) || "Не менее 6 символов: как минимум одна заглавная буква, одна цифра и один специальный символ.";
  };

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) || "Проверьте коректность email!";
  };

  const submit = async (register_data) => {
    console.log(register_data)
    const user = {
      username: register_data.username,
      email: register_data.email,
      firstname: register_data.firstname,
      lastname: register_data.lastname,
      password: register_data.password
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true,
    };

const { data } = await axios.post('http://localhost:8000/api/auth/register', user, config);
  localStorage.clear();
  localStorage.setItem('access_token',data.access);
  localStorage.setItem('refresh_token',data.refresh);
  axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
  navigate('/')
};
    return (
      <main className="register-form-container">
        <h1 class="h3">Регистрация</h1>
        <form className="register-form" onSubmit={handleSubmit(submit)}>
            <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" {...register("username", { required: "Поле обязательно для заполнения!", validate: validateUsername })}></input>{errors.username && <span className="error-validate-form">{errors.username.message}</span>}
                <label for="floatingInput">Логин</label>
            </div>
            <div className="form-floating">   
                <input type="password" className="form-control" id="floatingPassword" {...register("password", { required: "Поле обязательно для заполнения!", validate: validatePassword })}></input>{errors.password && <span className="error-validate-form">{errors.password.message}</span>}
                <label for="floatingPassword">Пароль</label>
            </div>
            <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" {...register("email", { required: "Поле обязательно для заполнения!", validate: validateEmail })}></input>{errors.email && <span className="error-validate-form">{errors.password.email}</span>}
                <label for="floatingInput">Email</label>
            </div>
            <div className="form-floating">        
                <input type="text" className="form-control" id="floatingInput" {...register("firstname", { required: false })}></input>
                <label for="floatingInput">Имя</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" {...register("lastname", { required: false })}></input>
                <label for="floatingInput">Фамилия</label>
            </div>
            <button type="submit" className="w-100 btn btn-lg">Зарегестрироваться</button>
            <button className="w-100 btn btn-lg" onClick={() => navigate('/')}>Отмена</button>
      </form>
      </main>
    )
  };

export default Registration