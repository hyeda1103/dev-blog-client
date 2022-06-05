import { useMemo, useRef } from 'react';
import axios from "axios";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import * as T from '@root/types';
import { API } from '@root/config';
import resizeImage from "@root/helpers/resizeImage";
import ErrorBox from '@root/components/molecules/errorBox';

interface Props {
  id: string
  label: string
  value: string
  theme: string
  handleChange: any
  placeholder?: string
  formErrors: T.Object
}

const QuillNoSSRWrapper = typeof window === 'object' ? require('react-quill') : () => false

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

function TextEditor({
  id, label, value, theme, handleChange, formErrors
}: Props) {
  const QuillRef = useRef<ReactQuill>();

  const imageHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    
    input.click();
  
    input.onchange = async () => {
      if (input.files === null) return;
      const [file] = input.files;
  
      try {
        const image = await resizeImage(file);
        // Get image url
        const res = await axios.post(`${API}/post/upload-image`, { image })
        const quill = QuillRef.current?.getEditor();
        
        if (quill === undefined) return;
        // Save current cursor state
        const range = quill.getSelection(true);
        const position = range ? range.index : 0;

        // Insert uploaded image
        quill.insertEmbed(position, 'image', res.data);
        quill.setSelection(position + 1, 1);
      } catch (error) {
        console.error(error)
      }
    };
  }

  // useMemo를 사용한 이유는 modules가 렌더링마다 변하면 에디터에서 입력이 끊기는 버그가 발생
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  return (
    <>
      <QuillNoSSRWrapper
        ref={QuillRef}
        placeholder="본문을 입력하세요..."
        modules={modules}
        formats={formats}
        value={value}
        onChange={handleChange}
        theme={theme}
        style={{
          border: !!formErrors[id] ? '1px solid red' : '1px solid #666',
        }}
      />
      {formErrors[id] && (
        <ErrorBox error={formErrors[id]} />
      )}
    </>
  );
}

export default TextEditor;
