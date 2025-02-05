import { FileDescriptionProps } from '../../../../models';
import './FileDescription.css';


const FileDescription: React.FC<FileDescriptionProps> = ({
    upload,
    download,
    size,
    comment,
}) => {
    const formatDate = function(data: string | undefined) {
        if (!data) return '';
        
        const date = new Date(data); 
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()); 
    
        return `${day}.${month}.${year}`;
    }

    return (
        <div className="file-description">
            <div className="file-description-item">
                <div className="file-description-name">Upload data:</div>
                <div className="file-description-content">{ formatDate(upload) }</div>
            </div>
            <div className="file-description-item">
                <div className="file-description-name">Download data:</div>
                <div className="file-description-content">{ formatDate(download) }</div>
            </div>
            <div className="file-description-item">
                <div className="file-description-name">size:</div>
                <div className="file-description-content">{ size }</div>
            </div>
            <div className="file-description-item">
                <div className="file-description-name">comment:</div>
                <div className="file-description-content">{ comment }</div>
            </div>
        </div>
    )
}

export default FileDescription;