import React from "react";
import { Post } from "../components/Post";
import AddCommentForm from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";
import ReactMarkdown from 'react-markdown';

export const FullPost = () => {
  const [data, setData] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        return axios.get(`/posts/${id}/comments`);
      })
      .then((res) => {
        setComments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Error while receiving data');
        setLoading(false);
      });
  }, [id]);

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  if (isLoading) {
    return <Post isLoading={true} />;
  }

  if (!data) {
    return <p>Post not found</p>;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${procces.env.REACT_APP_shell_eco_marathon_site}${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={comments.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={comments.map((comment, index) => ({
          ...comment,
          id: comment._id || index,
        }))}
        isLoading={false}
      >
        <AddCommentForm postId={data._id} onAddComment={handleAddComment} />
      </CommentsBlock>
    </>
  );
};

export default FullPost;


// import React from "react";
// import { Post } from "../components/Post";
// import { Index } from "../components/AddComment";
// import { CommentsBlock } from "../components/CommentsBlock";
// import { useParams } from "react-router-dom";
// import axios from "../axios"; // убедитесь, что путь правильный
// import ReactMarkdown from 'react-markdown'
// export const FullPost = () => {
//   const [data, setData] = React.useState(null);
//   const [isLoading, setLoading] = React.useState(true);
//   const { id } = useParams();

//   React.useEffect(() => {
//     setLoading(true); // установите загрузку в true при начале запроса
//     axios
//       .get(`/posts/${id}`)
//       .then((res) => {
//         setData(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.warn(err);
//         alert('Ошибка при получении данных');
//         setLoading(false);
//       });
//   }, [id]); // добавьте зависимость id, чтобы запрос выполнялся при изменении id

//   if (isLoading) {
//     return <Post isLoading={true} />;
//   }

//   if (!data) {
//     return <p>Пост не найден</p>;
//   }

//   return (
//     <>
//       <Post
//         id={data._id}
//         title={data.title}
//         imageUrl={data.imageUrl ? `http://localhost:3050${data.imageUrl}`:''}
//         user={data.user}
//         createdAt={data.createdAt}
//         viewsCount={data.viewsCount} 
//         commentsCount={data.comments ? data.comments.length : 0}
//         tags={data.tags}
//         isFullPost
//       >
//        <ReactMarkdown children = {data.text} /> 
//       </Post>
//       <CommentsBlock
//         items={(data.comments || []).map((comment, index) => ({
//           ...comment,
//           id: index,
//         }))}
//         isLoading={false}
//       >
//         <Index />
//       </CommentsBlock>
//     </>
//   );
// };

// export default FullPost;
