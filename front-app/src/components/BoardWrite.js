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
            toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
            upload: {
                types: ['png', 'jpeg'],
                url: 'http://localhost:9999/upload',
                withCredentials: false,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        }
    };

    const uploadFile = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                const response = await axios.post('http://localhost:9999/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.status === 200) {
                    return response.data.fileUrl; // 파일 URL 반환
                } else {
                    throw new Error('파일 업로드 실패');
                }
            } catch (error) {
                console.error('파일 업로드 오류:', error);
                throw new Error('파일 업로드 중 오류가 발생했습니다.');
            }
        }
        return null;
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

        try {
            // CKEditor에서 콘텐츠 가져오기
            const rawContent = myEditor.getData();

            // 게시글 작성 데이터
            const jsonData = {
                mId: user.boardMemberId,
                showTitle: title.current.value,
                showContent: rawContent, // HTML 태그를 포함한 콘텐츠
                pNick: user.boardMemberNick,
                showImage: await uploadFile() // 업로드된 이미지 URL을 추가
            };

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
    };

    const handleEditorReady = (editor) => {
        setMyEditor(editor);
        const editableElement = editor.ui.view.editable.element;
        editableElement.style.height = '500px';
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
                    onReady={handleEditorReady}
                    data=""
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
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
