import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css';

const Addfile = () => {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState('');
  const [fileComment, setFileComment] = useState('');

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
    const formData = new FormData();
    formData.append('filename', fileName);
    formData.append('comment', fileComment);
    formData.append('file', file);
    const { response } = await axios.post('http://127.0.0.1:8000/api/file/upload/', formData, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('access_token')}`,
            'Content-Type': 'multipart/form-data'

        },
        withCredentials: true,
        responseType: 'json'
    });
    console.log(response)
    toast.success('Файл успешно загружен!')
    
    } catch (error) {
        console.error('Upload failed:', error.message)
        toast.error('Ошибка загрузки файла: "Что то пошло не так, попробуйте позже"');
    };
    
  };
  

    return (
    <form className="w-50 order-last" onSubmit={handleSubmit}>
      <div className="mb-3">
        <input className="form-control" type="file" id="formFile" onChange={handleFileInput}></input>
        <label for="formFile" class="form-label">Введите название файла</label>
        <input className="form-control" type="text" placeholder="Введите название файла" readOnly value={fileName} aria-label="default input example"></input>
        <input className="form-control mt-2" type="text" placeholder="Введите Комментарий к файлу" onChange={(e) => setFileComment(e.target.value)} value={fileComment}></input>
        <button className="btn btn-primary mt-3" type="submit">Отправить файл</button>
      </div>
    <ToastContainer />
    </form>
    
    );
};

export default Addfile;
