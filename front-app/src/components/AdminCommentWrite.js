import styles from '../css/adminCommentWrite.module.css'

export default function AdminCommentWrite() {

  return(
    <div className={styles.adminCommentWrite}>
      <textarea placeholder="답변 내용을 입력하세요."/>
      <button>답변입력</button>
    </div>
  );
}