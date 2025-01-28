import React from 'react';

const DownloadButton = ({ fileId }) => {
    const handleDownload = () => {
        // Создаем URL для файла
        const fileUrl =` http://localhost:8000/download_file/${fileId}/`;

        // Создаем элемент <a>
        const link = document.createElement('a');
        link.href = fileUrl;
        // link.setAttribute('download'); // Укажите имя файла, если необходимо

        // Добавляем элемент на страницу
        document.body.appendChild(link);
        
        // Программно кликаем по ссылке для начала скачивания
        link.click();
        
        // Удаляем элемент после скачивания
        document.body.removeChild(link);
    };

    return (
        <button onClick={handleDownload}>
            Скачать файл
        </button>
    );
};


export default DownloadButton;
