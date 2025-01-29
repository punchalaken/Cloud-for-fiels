import React from 'react'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css';
import '../style/Authorization.css'


const Authorization = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const openRegister = () =>{
    navigate('/register')
  };
const submit = async (data) => {

  const user = {
    username: data.username,
    password: data.password
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,

  };
  try{
    const { data } = await axios.post('http://localhost:8000/api/auth/login', user, config);
    localStorage.clear();
    console.log(data)
    localStorage.setItem('access_token',data.token);
    localStorage.setItem('refresh_token',data.token);
    axios.defaults.headers.common['Authorization'] = `Token ${data['token']}`;
    navigate('/files')
  } catch (error) {
    console.error('Authorization failed:', error.message);
    toast.error('Ошибка авторизации: "Введен неверный логин или пароль"');
  }
};
  
    return (
    <div className="auth-form">
      <main className="form-signin">
        <h1 class="h3">Авторизация</h1>
      <form action="" onSubmit={handleSubmit(submit)}>
          <div className="form-floating">
            <input type="text" className="form-control" id="floatingInput" {...register("username", { required: true })}></input>{errors.username?.type === "required" && "Поле обязательно для заполнения!"}
            <label for="floatingInput">Логин</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" {...register("password", { required: true })}></input>{errors.password?.type === "required" && "Поле обязательно для заполнения!"}
            <label for="floatingPassword">Пароль</label>
          </div>
        <button type="submit" className="w-100 btn btn-lg">Вход</button>
        <button className="w-100 btn btn-lg" onClick={openRegister}>Регистрация</button>
      <ToastContainer />
      </form>
      </main>
    </div>
    )
  };

export default Authorization