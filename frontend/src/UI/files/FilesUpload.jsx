import React, { useState } from 'react';

const UploadFiles = ({ userId }) => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const serverUrl = 'http://127.0.0.1:8000/upload_file/';

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (!selectedFiles) {
      alert('Пожалуйста, выберите файлы для загрузки.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }

    formData.append('user_id', userId)

    try {
      // Здесь происходит отправка файлов на сервер
      const response = await fetch(serverUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Файлы успешно загружены:', result);
      } else {
        console.error('Ошибка при загрузке файлов:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  return (
    <div>
      <h2>Загрузить файлы</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Загрузить</button>
    </div>
  );
};

export default UploadFiles;