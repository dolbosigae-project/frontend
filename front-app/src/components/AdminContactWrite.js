import React, { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import styles from '../css/adminContactWrite.module.css';

export default function AdminContactWrite() {
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

    const editorConfig = {
        toolbar: [
            'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
            'alignment', '|',
            'imageUpload', '|',
            'undo', 'redo'
        ],
        language: 'ko',
        ckfinder: {
            uploadUrl: '/your-upload-endpoint'
        },
        image: {
            toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
        }
    };

    const [myEditor, setMyEditor] = useState();
    const writeClick = () => {
        console.log(myEditor.getData());
    };

    return (
        <div>
            <CKEditor
                editor={ClassicEditor}
                config={editorConfig}
                data="<p>Hello from CKEditor 5!</p>"
                onReady={editor => {
                    console.log('Editor is ready to use!', editor);
                    setMyEditor(editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                }}
            />
            <hr />
            <button onClick={writeClick}>글쓰기</button>
        </div>
    );
}
