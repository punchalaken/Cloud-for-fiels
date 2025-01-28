import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

export const AdminPage = () => {
  const location = useLocation()
  const { name } = location.state || {}
  if (!location.state) {
    return <h1>Авторизуйтесь!</h1>
  }
  const [viewUsers, setViewUsers] = useState([])
  const [lastUsersUpload, setLastUsersUpload] = useState(new Date())
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://127.0.0.1:8000/users/")
    .then(response => {
      if (response.ok) {
        return response.json()
      }
    })
    .then(data => {
      console.log("Пользовтель успешно загружены ", data)
      setViewUsers(data)
    })
  }, [])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/users/")
    .then(response => {
      if (response.ok) {
        return response.json()
      }
    })
    .then(data => {
      console.log("Пользовтель успешно загружены ", data)
      setViewUsers(data)
    })
  }, [lastUsersUpload])

  const upLoadUsers = () => {
    setLastUsersUpload(new Date())
  }

  const goFilesUser = (user) => {
      navigate('/files_user', { state: user })
    
    // navigate('/files', { state: data.user[0] })
  }
  
  return <div className="container">
    <h2>Здравствуйте, {name}</h2>
    <button onClick={upLoadUsers}>Обновить список пользователей</button>
    <ul>
      {viewUsers.map(elem => {
        return <li key={elem.id}>
          <div>id: {elem.id}</div>
          <div>name: {elem.name}</div>
          <button onClick={() => {goFilesUser(elem)}}>Перейти в файловое хранилище</button>
        </li>
      })}
    </ul>
  </div>
}
