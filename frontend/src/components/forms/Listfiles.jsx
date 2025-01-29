import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Listfiles({ onDownload, onDelete, onRename, onOpen }) {
  const [files, setFiles] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [isSortedDesc, setIsSortedDesc] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  async function fetchFiles() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/files', {
        headers: {
            'Authorization': `Token ${localStorage.getItem('access_token')}`
          },
        withCredentials: true,
        responseType: 'json'
      });
      console.log(response)
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setIsSortedDesc(!isSortedDesc);
    } else {
      setSortColumn(column);
      setIsSortedDesc(true);
    }
  };

  const sortedFiles = [...files].sort((a, b) => {
    switch (sortColumn) {
      case 'filename':
        return isSortedDesc 
          ? a.filename.localeCompare(b.filename)
          : b.filename.localeCompare(a.filename);
      case 'size':
        return isSortedDesc 
          ? a.size - b.size
          : b.size - a.size;
      case 'uploaded':
        return isSortedDesc 
          ? new Date(a.uploaded).getTime() - new Date(b.uploaded).getTime()
          : new Date(b.uploaded).getTime() - new Date(a.uploaded).getTime();
      default:
        return 0;
    }
  });


    return (
      <table className="table table-info table-striped">
        <thead>
          <tr>
            <th onClick={() => handleSort('filename')}>Имя файла</th>
            <th onClick={() => handleSort('size')}>Размер</th>
            <th onClick={() => handleSort('uploaded_at')}>Дата загрузки</th>
            <th onClick={() => handleSort('downloaded_at')}>Дата скачивания</th>
            <th>Действия с файлом</th>
          </tr>
        </thead>
        <tbody>
          {sortedFiles.map((file) => (
            <tr key={file.id}>
              <td>{file.filename}</td>
              <td>{file.size}</td>
              <td>{new Date(file.uploaded_at).toLocaleDateString()}</td>
              <td>{new Date(file.downloaded_at).toLocaleDateString()}</td>
              <td>
                <div className="btn-group" role="group">
                  <button type="submit" className="btn btn-primary" onClick={() => {onDelete(file.id) 
                    fetchFiles()
                    }}>
                    Удалить
                  </button>
                  <button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdropShared" onClick={() => onDownload(file.id)}>
                    Поделиться
                  </button>
                  <button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdropRename" onClick={() => onRename(file.id)}>
                    Переименовать
                  </button>
                  <button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdropShow" onClick={() => onOpen(file.id)}>
                    Просмотр
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )

}

export default Listfiles
