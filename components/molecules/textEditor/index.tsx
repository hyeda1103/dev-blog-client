import { useMemo, useRef } from 'react';
import axios from "axios";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import hljs from 'highlight.js'

import * as T from '@root/types';
import { API } from '@root/config';
import resizeImage from "@root/helpers/resizeImage";
import CustomToolbar, { formats } from '@root/components/molecules/customToolbar';
import { EditorWrapper } from './styles';

interface Props {
  id: string
  value: string
  theme: string
  handleChange: any
  placeholder?: string
  formErrors: T.Object
}

const QuillNoSSRWrapper = typeof window === 'object' ? require('react-quill') : () => false

hljs.configure({
  languages: ['javascript', 'typescript', 'java']
})

function TextEditor({
  id, value, theme, handleChange, formErrors
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
  
  const modules = useMemo(() => ({
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true
    },
    syntax: true,
    toolbar: {
      container: "#toolbar",
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  return (
    <div className="text-editor">
      <CustomToolbar />
      <EditorWrapper error={!!formErrors[id]}>
        <QuillNoSSRWrapper
          ref={QuillRef}
          placeholder="본문"
          modules={modules}
          formats={formats}
          value={value}
          onChange={handleChange}
          theme={theme}
        />
      </EditorWrapper>
    </div>
  );
}

export default TextEditor;
