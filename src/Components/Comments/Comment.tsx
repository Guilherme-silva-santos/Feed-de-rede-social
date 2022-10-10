import { ThumbsUp, Trash } from "phosphor-react";
import { Avatar } from "../Avatar/Avatar";
import styles from "./Comment.module.css";
import { useState } from "react";


interface CommentProps{
  content:string;
  onDeleteComment: (comment:string) => void;
}

export function Comment({content, onDeleteComment}: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment(){
    onDeleteComment(content);
  }

  function handleLikeComment(){
    setLikeCount(likeCount + 1);
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} // para retirar a borda do elemento o hasBorder e a props e o false tira a borda
       src="https://avatars.githubusercontent.com/u/82386781?v=4" alt="" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Guilherme Silva</strong>
              <time title="11 de maio às 08:30" dateTime="2022-05-11 08:30:30">
                Cerca de 1h atrás
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar o Comentário">
                <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
            <button onClick={handleLikeComment}>
                <ThumbsUp />
                Aplaudir <span>{likeCount}</span>
            </button>
        </footer>
      </div>
    </div>
  );
}
