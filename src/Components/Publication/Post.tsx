import styles from "./Post.module.css";
import { Comment } from "../Comments/Comment";
import { Avatar } from "../Avatar/Avatar";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";


interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}


export function Post({ author, publishedAt, content }: PostProps) {
  // ({author})  como so é chamada as propriedades de dentro do author, pasa só o
  // author e não se passa o props para todos os elementos
  const [comments, setComments] = useState(
    // setComments para avisar quando houver alterações
    // servindo não só para alterar os valores mas tabém para "avisar" o react que foi feita uma alteração
    // e para que ela seja exibida em tela
    ["Post muito bacana, hein?!"]
    );
    const [newCommentText, setNewCommentText] = useState("");
    console.log(newCommentText);
    
  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    //...comments, serve para copiar os valores que já estão na var de comments
    setComments([...comments, newCommentText]);
    // usou para alterar o valor dos comentarios
    // não passa só o que quer inserir e sim o novo valor, isso é imutabilidade

    setNewCommentText("");
  }

  const publishedDateFormateted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  ); // date-fns, biblioteca para formato
  // de datas

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value); //o valor de dentro da textArea esta armazenado dentro o useState
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement> ){
    event.target.setCustomValidity('Esse campo é obrigatório')
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeleteOne = comments.filter((comment) => {
      return comment != commentToDelete;
    });

    setComments(commentsWithoutDeleteOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl}  />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormateted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
          {/* chamou a var em que stão as "caracteristicas" do date  */}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type == "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type == "link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu Comentário</strong>
        <textarea
          value={newCommentText}
          name="comment"
          placeholder="Deixe se comentário"
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty} >Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
