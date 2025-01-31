import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { selectIsAuth } from '../../redux/slices/auth';
import { useSelector } from 'react-redux';
import { useNavigate,Navigate,useParams } from 'react-router-dom';
import axios from '../../axios';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import store from '../../redux/store';

// console.log(store.getState());

export const AddPost = () => {

  const { id } = useParams(); 
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth); 
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const inputFileRef = React.useRef(null);
 
  // console.log(store.getState());
  const isEditing = Boolean(id)

  const handleChangeFile = async (event) => {
    // console.log(event.target.files )
    try {
      const formData = new FormData();
      const file = event.target.files[0]; 
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData) 
      // console.log(data) 
      setImageUrl(data.url); // Предполагается, что сервер возвращает URL загруженного изображения
    } catch (err) {
      console.warn(err);
      alert("Error uploading file");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);
   
  const onSubmit= async() => {
    try{
      setLoading(true)
      const fields = {
        title,
        imageUrl,
        tags,
        text,
      }
      const { data } = await isEditing
      ? await axios.patch(`/posts/${id}`, fields)
      : await axios.post(`/posts/`, fields)
      const _id = isEditing ? id : data._id 
      navigate(`/posts/${_id}`)
    }catch(err){
      console.warn(err)
      alert("Ошибка при загрузке файла");
    }
  }
  React.useEffect(()=>{
    if(id){
      axios
        .get(`/posts/${id}`)
        .then(({data}) =>{
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setTags(data.tags.join(','));
        })
        .catch((err) => {
          console.warn(err);
          alert( "Error receiving article!");
        })
    }
  },[])

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Enter text...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }
  
  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
         Download preview
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Delete
          </Button>
          <img className={styles.image} src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Article title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing?  "save ": "Publish "}
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
