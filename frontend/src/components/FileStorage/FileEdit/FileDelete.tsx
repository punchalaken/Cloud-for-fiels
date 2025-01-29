import React from 'react';
import { deleteFile } from '../../../api/api';
import { FileDeleteProps } from '../../../models';
import './FileForm.css';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';


const FileDelete: React.FC<FileDeleteProps> = ({
  currentFile, setForm, setFiles, setCurrentFile
}) => {
  const userId = useSelector((state: RootState) => state.users.loginUser?.id ?? 0);
  const prefix = import.meta.env.BUILD_PREFIX || '';

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentFile?.id) {
      console.error("currentFile.id is undefined");
      return;
    }
    const response = await deleteFile(currentFile.id);

    if (response.status === 200) {
      if (response.data) {
        const filteredFiles = response.data.filter((file: { user_id: number }) => file.user_id === userId);
        setFiles(filteredFiles);
        setCurrentFile();
        setForm();
      }

    }
  };

  const onCloseHandler = () => {
    setForm();
  };

  return (
    <form className="form" onSubmit={onSubmitHandler}>
      <h2
        className="form--title"
      >
        Вы уверены что хотите удалить этот файл?
      </h2>
      <input type="submit" value="Да" required />
      <button
        className="close"
        onClick={onCloseHandler}
        onKeyDown={onCloseHandler}
        type="button"
        aria-label="Close"
      >
        <img src={`${prefix}close.svg`} alt="close" className="close"></img>
      </button>
      <div
        className="no"
        onClick={onCloseHandler}
        onKeyDown={onCloseHandler}
        role="button"
        tabIndex={0}
      >
        Нет
      </div>
    </form>
  );
}

export default FileDelete;
