import React, { useState, useRef } from 'react';
import Header from '../layout/Header.jsx';
import Listfiles from '../forms/Listfiles.jsx';
import Addfile from '../forms/Addfile.jsx';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import '../style/Home.css';


function Home() {
  const [files, setFiles] = useState([]);
  const [sharedLink, setSharedLink] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const fileIdToRename = useRef(null)
  const navigate = useNavigate();

  const deleteFile = async (id) => {
    const response = await axios.delete(`http://127.0.0.1:8000/api/files/${id}/`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('access_token')}`
          },
        withCredentials: true,
        responseType: 'json'
      });
      console.log(response)
  };

  const sharedFile = async (id) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/file/shared/${id}/`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('access_token')}`
          },
        withCredentials: true,
        responseType: 'json'
      });
      setSharedLink(`${origin}/${response.data.link}`);
      console.log(response)
  };

  const renameFile = async () => {
    const id_file = fileIdToRename.current
    const newName = {filename: newFileName}
    const response = await axios.patch(`http://127.0.0.1:8000/api/files/${id_file}/`, newName, {
      headers: {
          'Authorization': `Token ${localStorage.getItem('access_token')}`
        },
      withCredentials: true,
      responseType: 'json'
    });
  }

  const openModalRename = async(id) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/files/${id}/`, {
      headers: {
          'Authorization': `Token ${localStorage.getItem('access_token')}`
        },
      withCredentials: true,
      responseType: 'json'
    });
    setNewFileName(response.data.filename)
    fileIdToRename.current = id;
  };

  const openModalFile = async(id) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/file/shared/${id}/`, {
      headers: {
          'Authorization': `Token ${localStorage.getItem('access_token')}`
        },
      withCredentials: true,
      responseType: 'json'
    });
    setSharedLink(`${origin}/${response.data.link}/`);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(sharedLink);
    toast.success('Ссылка успешно скопирована в буфер обмена!')
  }

  const logOut = async e => {
    try {
    const response = await axios.post(`http://127.0.0.1:8000/api/auth/logout`, {
      headers: {
          'Authorization': `Token ${localStorage.getItem('access_token')}`
        },
      withCredentials: true,
      responseType: 'json'
    });
    navigate('/')
   } catch (error) {
    console.error('Log out failed:', error.message);
    toast.error('Ошибка разлогина: "Попробуйте позже"');
   }
  }

  return (
      <div className="d-flex flex-column min-vh-100">
        <Header className="mb-3" logOut={logOut}/>
        <div className="flex-grow-1 d-flex flex-column gap-3 mt-3">
          <Addfile className="col-md-4"/>
          <Listfiles className="flex-grow-1" files={files} setFiles={setFiles} onDelete={deleteFile} onDownload={sharedFile} onRename={openModalRename} onOpen={openModalFile}/>
        </div>
        <div className="modal" id="staticBackdropShared" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-body">Ссылка для скачивания</h5>
              </div>
              <div className="modal-body">
                <p>{sharedLink}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={copyLink}>Копировать ссылку</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal" id="staticBackdropRename" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-body">Введите новое название!</h5>
              </div>
              <div className="modal-body">
                <input type="text" className="new-name-file" value={newFileName} onChange={(e) => setNewFileName(e.target.value)}></input>
              </div>
              <div className="modal-footer">
                    <button className="btn btn-primary" type='submit' data-bs-dismiss="modal" onClick={(e) => renameFile()}>Переименовать</button>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                  </div>
            </div>
          </div>
        </div>
        <div className="modal" id="staticBackdropShow" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Просмотр файла!</h5>
              </div>
              <div className="modal-body">
                <iframe src={sharedLink}></iframe >
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
    </div>
  );
}

export default Home;