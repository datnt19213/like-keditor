
## ✨ KEditor  

A powerful, extensible, and customizable rich-text editor built on top of [Yoopta](https://yoopta.dev) - [Yoopta Docs](https://yoodocs.space). Comes with built-in support for images, videos, files, markdown export, and more!

#### **[Demo](https://www.google.com)**

### 🔧 Features

- ✅ **Fully customizable** with plugins, marks, tools
- 🖼️ Supports image, video, file uploads
- 🔄 Undo/Redo capability via external controls
- 🧩 Custom plugin support (e.g., carousel)
- 📤 Export to HTML, Markdown, Plain Text
- 📌 Real-time change handling
- 🔒 Read-only mode support
- 🧠 Smart placeholder and autofocus support
    

----------

## 📦 Installation


```bash
npm install like-keditor
//or
yarn add like-keditor
``` 
----------
Add tailwind config tailwind.config.js

  

---

If you use tailwindcss >=v4.0 use this in init css file in project:

```css
@config  "path_to_your_config_tailwindcss_file"
/* example: @config "../tailwind.config.js" #for vite react */
/* or use link to index if use simple React base 
<script  src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script> 
(this maybe difference, should check on tailwindcss official website) */
```
---
Add needed packages to your `tailwind.config.js` file:
```ts
{
content: ["./node_modules/like-keditor/**/*.{js,ts,jsx,tsx}"],
theme: {
// ...
},
variants: {
// ...
},
plugins: [],
};

```
----------

## 🧠 Usage

### 1. Import the component

```ts
import  { Editor }  from  'like-keditor';
``` 

### 2. Basic usage

```ts
<Editor />
``` 

### 3. With advanced configuration
```ts
import React, { useState } from 'react';
import { Editor } from 'like-keditor'; 

import '../node_modules/like-keditor/dist/index.css';

// Optional: Add styles for editor
import './styles/editor.css';
import './styles/render.css';

export default function EditorExample() {
  const [exported, setExported] = useState<{
    html?: string;
    markdown?: string;
    plainText?: string;
  }>({});
  const undoRef = React.useRef<() => void>(() => {});
  const redoRef = React.useRef<() => void>(() => {});

  const handleEditorChange = (value: any) => {
    console.log('Editor content updated:', value);
  };

  const handleExport = ({
    html,
    markdown,
    plainText,
  }: {
    html: string;
    markdown: string;
    plainText: string;
  }) => {
    setExported({ html, markdown, plainText });
  };

  const mockImageUpload = async (file: File) => {
    const src = URL.createObjectURL(file);
    return {
      src,
      alt: file.name,
      sizes: {
        width: 300,
        height: 200,
      },
    };
  };

  const mockVideoUpload = async (file: File) => {
    return {
      src: URL.createObjectURL(file),
      format: 'video/mp4',
    };
  };

  const mockPosterUpload = async (file: File) => {
    return {
      src: URL.createObjectURL(file),
      alt: file.name,
      sizes: {
        width: 400,
        height: 300,
      },
    };
  };

  const mockFileUpload = async (file: File) => {
    return {
      src: URL.createObjectURL(file),
      format: file.type,
      name: file.name,
      size: file.size,
    };
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Yoopta Editor Example</h1>

      // <Button className='border border-gray-500 mr-2 hover:bg-gray-50' onClick={() => undoRef.current?.()}>Undo</Button>
      // <Button className='border border-gray-500 mr-2 hover:bg-gray-50' onClick={() => redoRef.current?.()}>Redo</Button>

      <Editor
        onChange={handleEditorChange}
        onExport={handleExport}
        placeholder="Start typing your awesome content..."
        autoFocus
        exportAllows={['html', 'markdown', 'plainText']}
        onImageUpload={mockImageUpload}
        onVideoUpload={{
          onUpload: mockVideoUpload,
          onUploadPoster: mockPosterUpload,
        }}
        onFileUpload={mockFileUpload}
        onUndo={(fn) => (undoRef.current = fn)}
        onRedo={(fn) => (redoRef.current = fn)}
      />
		
      <div className="mt-10 space-y-4">
        <h2 className="text-xl font-bold">Exported HTML</h2>
        <pre className="bg-gray-100 p-3 rounded max-h-64 overflow-auto whitespace-pre-wrap">
          {exported.html || 'No HTML yet.'}
        </pre>

        <h2 className="text-xl font-bold">Exported Markdown</h2>
        <pre className="bg-gray-100 p-3 rounded max-h-64 overflow-auto whitespace-pre-wrap">
          {exported.markdown || 'No Markdown yet.'}
        </pre>

        <h2 className="text-xl font-bold">Exported Plain Text</h2>
        <pre className="bg-gray-100 p-3 rounded max-h-64 overflow-auto whitespace-pre-wrap">
          {exported.plainText || 'No plain text yet.'}
        </pre>
      </div>
    </div>
  );
}
```

----------


## 🎨 Styling export HTML
> **Apply it when your export HTML was not same style with the editor**

Here is the css export HTML style default:
```css
#details-container-TdaSo6fg2z  *,
#details-container-TdaSo6fg2z  *::before,
#details-container-TdaSo6fg2z  *::after {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	outline: none;
	transition: all  0.2s  ease;
}

#details-container-TdaSo6fg2z  h1,
#details-container-TdaSo6fg2z  h2,
#details-container-TdaSo6fg2z  h3,
#details-container-TdaSo6fg2z  h4,
#details-container-TdaSo6fg2z  h5,
#details-container-TdaSo6fg2z  h6 {
	font-weight: 600;
	line-height: 1.25;
	margin-bottom: 0.75rem;
}

#details-container-TdaSo6fg2z  h1 { font-size: 2.25rem; }
#details-container-TdaSo6fg2z  h2 { font-size: 1.875rem; }
#details-container-TdaSo6fg2z  h3 { font-size: 1.5rem; }
#details-container-TdaSo6fg2z  h4 { font-size: 1.25rem; }
#details-container-TdaSo6fg2z  h5 { font-size: 1.125rem; }
#details-container-TdaSo6fg2z  h6 { font-size: 1rem; }

#details-container-TdaSo6fg2z  p {
	margin-bottom: 1rem;
}

#details-container-TdaSo6fg2z  a {
	text-decoration: none;
	font-weight: 500;
}

#details-container-TdaSo6fg2z  a:hover {
	text-decoration: underline;
}

#details-container-TdaSo6fg2z  ul,
#details-container-TdaSo6fg2z  ol {
	padding-left: 1.5rem;
	margin-bottom: 1rem;
}

#details-container-TdaSo6fg2z  li {
	margin-bottom: 0.5rem;
}

#details-container-TdaSo6fg2z  img {
	max-width: 100%;
	border-radius: 0.5rem;
	margin: 1rem  0;
}

#details-container-TdaSo6fg2z  blockquote {
	border-left: 4px  solid  hsl(221.2, 83.2%, 53.3%);
	padding-left: 1rem;
	margin: 1rem  0;
	font-style: italic;
	border-radius: 0.25rem;
}


#details-container-TdaSo6fg2z  pre,
#details-container-TdaSo6fg2z  code {
	font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
	font-size: 0.95rem;
	border-radius: 0.375rem
	padding: 0.25rem  0.5rem;
	overflow-x: auto;
}

#details-container-TdaSo6fg2z  table {
	width: 100%;
	border-collapse: collapse;
	margin: 1rem  0;
	font-size: 0.95rem;
}

#details-container-TdaSo6fg2z  th,
#details-container-TdaSo6fg2z  td {
	border: 1px  solid  hsl(214.3, 31.8%, 91.4%);
	padding: 0.75rem  1rem;
	text-align: left;
}

#details-container-TdaSo6fg2z  th {
	font-weight: 600;
}

#details-container-TdaSo6fg2z  input,
#details-container-TdaSo6fg2z  select,
#details-container-TdaSo6fg2z  textarea,
#details-container-TdaSo6fg2z  button {
	font: inherit;
	border: 1px  solid  hsl(214.3, 31.8%, 91.4%);
	border-radius: 0.5rem;
	padding: 0.5rem  0.75rem;
	margin-bottom: 1rem;
}

#details-container-TdaSo6fg2z  input:focus,
#details-container-TdaSo6fg2z  select:focus,
#details-container-TdaSo6fg2z  textarea:focus {
border-color: hsl(221.2, 83.2%, 53.3%);
box-shadow: 0  0  0  2px  hsl(221.2, 83.2%, 90%);
}

#details-container-TdaSo6fg2z  button {
	cursor: pointer;
	font-weight: 500;
}

```

## 🧩 Props


|                 Prop               |                 Type                  |    Description           
|------------------------------------|---------------------------------------|-------------------------------------|
| value                                | YooptaContentValue                      | Initial editor value                  |
| onChange                             | (value, options) => void                | Callback on change                    |
| onExport                             | (data) => void                          | Callback for exporting content        |
| onImageUpload                        | (file) => Promise<...>                  | Image upload handler                  |
| onVideoUpload                        | { onUpload, onUploadPoster }            | Video and poster upload handlers      |
| onFileUpload                         | (file) => Promise<...>                  | File upload handler                   |
| exportAllows                         | ("html" \| "markdown" \| "plainText")[] | Types to export                       |
| readOnly                             | boolean                                 | If true, disables editing             |
| autoFocus                            | boolean                                 | If true, focuses editor on mount      |
| onUndo, onRedo                       | (callback) => void                      | Provide undo/redo functions to parent |
| onPathChange                         | (path: YooptaPath) => void              | Track focused block path              |
| placeholder                          | string                                  | Placeholder text                      |
| width, id, style, className          | any                                     | Optional DOM styling/ID               |
| classNameContainer                   | HTMLAttributes<HTMLDivElement>          | Container styling & props             |
| plugins, customPlugins, marks, tools | any[]                                   | Extend editor's capabilities          |

----------

## 📤 Exported Format

```ts
{ 
	html: "<div id='details-container-TdaSo6fg2z'>...</div>", 
	markdown: "**Bold text**", 
	plainText: "Just plain text", 
	type: ['html', 'markdown', 'plainText'],
}
``` 


## 🧪 Tips

-   You can fully customize the plugin system by passing your own `plugins`, `marks`, and `tools`.
    
-   Upload handlers let you integrate with any file hosting API (e.g., S3, Cloudinary).
    
-   All exports are auto-triggered on change — useful for syncing content with servers.
    

----------

## 🤝 License

MIT – free to use, modify, and extend.