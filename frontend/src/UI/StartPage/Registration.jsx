import { useState } from "react"
// import "./registration.css"


export const Registration = ({ SetViewPage }) => {

  const [inputInfo, setInputInfo] = useState({
    name: '',
    login: '',
    password: '',
  })
  const [errorMsg, setErrorMsg] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setInputInfo((prev) => ({
      ...prev, 
      [name]: value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    fetch('http://127.0.0.1:8000/users/', {
      method: "POST",
      body: JSON.stringify(inputInfo),
      headers: {
        "Content-Type": "application/json",
      }
    })
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    // console.log(data)
    if (data.id) {
      setErrorMsg("Успешно создан аккаунт")
      // SetViewPage("Authorization")
    } else {
      console.log(data.login[0])
      setErrorMsg("Данный логин уже используется")
    }
  })
  .catch(data => 
    console.log(data)
  )

  }

  return (
    <div className="container--form">
      <form onSubmit={onSubmit} className="auth--form">
        <h2>Регистрация</h2>
        <div className="input--block">
          <input type="text" name="name" onChange={onChange} placeholder="Имя" className="input--form"/>
          <input type="text" name="login" onChange={onChange} placeholder="Логиг" className="input--form"/>
          <input type="text" name="password" onChange={onChange} placeholder="Пароль" className="input--form"/>
          <div className="errorMsg">{errorMsg}</div>
        </div>
        <div className="buttons--block">
          <button type="submit" className="button--form submit">Зарегестрироваться</button>
          <button onClick={() => {SetViewPage("Authorization")}} className="button--form">Войти</button>
        </div>
      </form>
    </div>
  )
}
