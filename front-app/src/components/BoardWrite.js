import React, { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import styles from '../css/adminContactWrite.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BoardWrite() {
    const [myEditor, setMyEditor] = useState(null);
    const title = useRef();
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []);

    const editorConfig = {
        toolbar: [
            'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
            'alignment', '|',
            'imageUpload', '|',
            'undo', 'redo'
        ],
        language: 'ko',
        image: {
            toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
        }
    };

    const stripHtmlTags = (str) => {
        return str.replace(/<[^>]*>?/gm, '');
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:9999/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data.fileUrl;
        } catch (error) {
            console.error('파일 업로드 오류:', error);
            alert('파일 업로드 중 오류가 발생했습니다.');
        }
    };

    const writeClick = async () => {
        if (!title.current.value.trim()) {
            alert('제목을 입력하세요.');
            return;
        }
    
        if (!user) {
            alert('사용자 정보를 확인할 수 없습니다. 로그인 후 다시 시도해 주세요.');
            return;
        }
    
        if (myEditor) {
            const rawContent = myEditor.getData();
            const strippedContent = stripHtmlTags(rawContent);
            let fileUrl = '';

            if (file) {
                fileUrl = await uploadFile(file);
            }
    
            const jsonData = {
                mId: user.boardMemberId,
                showTitle: title.current.value,
                showContent: strippedContent,
                pNick: user.boardMemberNick,
                fileUrl: fileUrl,
            };
    
            try {
                const response = await axios.post('http://localhost:9999/shows', jsonData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                if (response.status === 200) {
                    alert('자랑글을 업로드하였습니다.');
                    navigate('/board'); // 게시글 작성 후 게시글 목록 페이지로 리디렉션
                } else {
                    alert('글 작성 중 예상치 못한 오류가 발생했습니다.');
                }
            } catch (error) {
                alert('글 작성 중 오류가 발생했습니다.');
            }
        }
    };

    const handleEditorReady = (editor) => {
        setMyEditor(editor);
        const editableElement = editor.ui.view.editable.element;
        editableElement.style.height = '500px';
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div>
            <div className={styles.editor}>
                <input
                    className={styles.adminTitle}
                    placeholder='제목을 입력하세요.'
                    ref={title}
                />
                <CKEditor
                    editor={ClassicEditor}
                    config={editorConfig}
                    data="<p>귀엽고 예쁜 내 반려견을 맘껏 자랑해주세요.</p>
                    <p>- 반려견 이름, 나이, 사는 곳, 좋아하는 장난감 등</p>
                    <p>- 사진이 있으면 더 좋아요.</p>
                    <p>- 게시판 목적과 다른 게시글은 통보 없이 삭제</p>
                    <p>===========================================</p>
                    <p>내용 입력시 전체 내용을 지우고 입력해주세요.</p>"
                    onReady={handleEditorReady}
                />
                <div className={styles.fileUpload}>
                    <label htmlFor="fileUpload">사진 업로드</label>
                    <input type="file" id="fileUpload" onChange={handleFileChange} />
                </div>
                <div className={styles.writeBtnGroup}>
                    <button className={styles.writeBtn} onClick={writeClick}>글쓰기</button>
                    <Link to='/board'>
                        <button className={styles.commentBtn}>글 목록</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
