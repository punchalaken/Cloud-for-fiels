import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UploadFiles from './FilesUpload';
import DownloadButton from './ButtonDownload';
import { sortByDate } from '../sortingDate';



export const FilesWelcome = () => {
  function formatDate(dateString) {
    const date = new Date(dateString);

    const months = [
      "января", "февраля", "марта", "апреля",
      "мая", "июня", "июля", "августа",
      "сентября", "октября", "ноября", "декабря"
    ];

    const hours = String(date.getHours()).padStart(2, '0'); 
    const minutes = String(date.getMinutes()).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear(); 

    return `${hours}:${minutes} ${day} ${month} ${year}`;
  }
  const location = useLocation();
  
  const { id, name, admin } = location.state || {};

  if (admin) {
    const navigate = useNavigate()
    useEffect(() => {navigate('/admin/', {state: location.state})}, [])
  } else {
    
    const [viewFiles, setViewFiles] = useState([])
    const [lastFileUpload, setLastFileUpload] = useState(new Date())

    useEffect(() => {
      fetch(`http://127.0.0.1:8000/get_files_user/${id}/`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        return false
      }
    })
    .then(data => {
      if (data) {
        setViewFiles(sortByDate(data))
      }
    })
    }, [])
  
    useEffect(() => {
      fetch(`http://127.0.0.1:8000/get_files_user/${id}/`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        return false
      }
    })
    .then(data => {
      if (data) {
        setViewFiles(sortByDate(data))
      }
    })
    }, [lastFileUpload])
  
  
    const onGetLink = (id) => {
      fetch(`http://127.0.0.1:8000/get_link_for_file/${id}/`)
      .then(
        response => setLastFileUpload(new Date())
      )
    }
  
    return (
      <div className='container'>
        <h1>Добро пожаловать, {name}!</h1>
        <button className='button--update--files' onClick={() => {setLastFileUpload(new Date())}}>Обновить список файлов</button>
        <UploadFiles userId={id}/>
        <ul>
        {viewFiles.map(elem => {
          return <li id={elem.id} key={elem.id}>
            <span>{elem.file_name}</span><br />
            <span>{formatDate(elem.date)}</span><br />
            < DownloadButton fileId={elem.id}/>
            <button onClick={() => onGetLink(elem.id)}>Поделиться файлом</button><br />
            <a href={elem.file_link}>{elem.file_link}</a>
          </li>
        })}
        </ul>
      </div>
    );
  }

  
}
