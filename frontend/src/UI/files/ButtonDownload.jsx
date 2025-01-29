const DownloadButton = ({ fileId }) => {
    const handleDownload = () => {

        const fileUrl =` http://localhost:8000/download_file/${fileId}/`;


        const link = document.createElement('a');
        link.href = fileUrl;

        document.body.appendChild(link);
        
        link.click();
        
        document.body.removeChild(link);
    };

    return (
        <button onClick={handleDownload}>
            Скачать файл
        </button>
    );
};


export default DownloadButton;
