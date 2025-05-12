// components/Editor.tsx
import './editor.css';
import './render.css';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import isEqual from 'lodash/isEqual';
import { useSelected } from 'slate-react';
import { v4 } from 'uuid';

import Accordion from '@yoopta/accordion';
import ActionMenuList, {
  DefaultActionMenuRender,
} from '@yoopta/action-menu-list';
import Blockquote from '@yoopta/blockquote';
import Callout from '@yoopta/callout';
import Code from '@yoopta/code';
import Divider from '@yoopta/divider';
import YooptaEditor, {
  createYooptaEditor,
  YooptaContentValue,
  YooptaEventChangePayload,
  YooptaOnChangeOptions,
  YooptaPath,
} from '@yoopta/editor';
import {
  html,
  markdown,
  plainText,
} from '@yoopta/exports';
import File from '@yoopta/file';
import {
  HeadingOne,
  HeadingThree,
  HeadingTwo,
} from '@yoopta/headings';
import Image from '@yoopta/image';
import Link from '@yoopta/link';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';
import {
  BulletedList,
  NumberedList,
  TodoList,
} from '@yoopta/lists';
import {
  Bold,
  CodeMark,
  Highlight,
  Italic,
  Strike,
  Underline,
} from '@yoopta/marks';
import Paragraph from '@yoopta/paragraph';
import Table from '@yoopta/table';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import Video from '@yoopta/video';

import { CarouselPlugin } from './customs/carousel';
import { INIT_VALUE } from './init';

export interface EditorProps {
	value?: YooptaContentValue;
	onChange?: (value: YooptaContentValue, options: YooptaOnChangeOptions) => void;
	onExport?: (data: {
		type: ("html" | "markdown" | "plainText")[];
		html: string;
		markdown: string;
		plainText: string;
	}) => void;
	onSelectionRef?: (ref: any) => void;

	onImageUpload?: (
		file: File
	) => Promise<{src: string; alt: string; sizes: {width: number; height: number}}>;
	onVideoUpload?: {
		onUpload: (
			file: File
		) => Promise<{src: string; alt: string; sizes: {width: number; height: number}}>;
		onUploadPoster: (file: File) => Promise<string>;
	};
	onFileUpload?: (file: File) => Promise<{src: string; format: string; name: string; size: number}>;

	exportAllows?: ("html" | "markdown" | "plainText")[];
	autoFocus?: boolean;

	plugins?: any[];
	customPlugins?: any[];
	isCustomPlugin?: boolean;
	marks?: any[];
	tools?: any;

	placeholder?: string;
	readOnly?: boolean;
	width?: number;
	id?: string;
	style?: React.CSSProperties;
	className?: string;
	classNameContainer?: React.HTMLAttributes<HTMLDivElement> & {
		style?: React.CSSProperties;
	};
	onPathChange?: (path: YooptaPath) => void;
	onUndo?: (undoFnc: () => void) => void;
  onRedo?: (redoFnc: () => void) => void;
}

export const DEFAULT_PLUGINS = [
	Paragraph,
	Table,
	Divider.extend({elementProps: {divider: (props) => ({...props, color: "#c2c2c2"})}}),
	Accordion,
	HeadingOne,
	HeadingTwo,
	HeadingThree,
	Blockquote,
	Callout,
	NumberedList,
	BulletedList,
	TodoList,
	Code,
	Link,
];

export const DEFAULT_CUSTOM_PLUGINS = [CarouselPlugin];

export const DEFAULT_MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

export const DEFAULT_TOOLS = {
	Toolbar: {tool: Toolbar, render: DefaultToolbarRender},
	ActionMenu: {tool: ActionMenuList, render: DefaultActionMenuRender},
	LinkTool: {tool: LinkTool, render: DefaultLinkToolRender},
};

export const Editor: React.FC<EditorProps> = ({
	value = INIT_VALUE,
	onChange,
	onExport,
	onSelectionRef,
	onImageUpload,
	onVideoUpload,
	onFileUpload,

	autoFocus = true,
	exportAllows = ["html", "markdown", "plainText"],

	plugins = DEFAULT_PLUGINS,
	customPlugins = DEFAULT_CUSTOM_PLUGINS,
	isCustomPlugin = false,
	marks = DEFAULT_MARKS,
	tools = DEFAULT_TOOLS,

	placeholder = "Write something ...",
	readOnly,
	width,
	id,
	className,
	style,
	classNameContainer,
	onPathChange,
	onUndo,
  onRedo
}) => {
	const [editorKey, setEditorKey] = useState(v4());

	const editor = useMemo(() => createYooptaEditor(), []);
	const [data, setData] = useState<YooptaContentValue>(value);
	const selectionRef = useRef(null);
  const [resetFlag, setResetFlag] = useState(false);
  const isSelected = useSelected();

	useEffect(() => {
		if (onSelectionRef) {
			onSelectionRef(selectionRef.current);
		}
	}, [onSelectionRef]);

	useEffect(() => {
    if (editor) {
      onUndo && onUndo(() => editor.undo());
      onRedo && onRedo(() => editor.redo());
    }
  }, [editor, onUndo, onRedo]);

	const serialize = (types: ("html" | "markdown" | "plainText")[]) => {
		const data = editor.getEditorValue();
		if (!data) return;

		const htmlString = types.includes("html") ? html.serialize(editor, data) : "";
		const markdownString = types.includes("markdown") ? markdown.serialize(editor, data) : "";
		const plainString = types.includes("plainText") ? plainText.serialize(editor, data) : "";

		onExport?.({
			html: `<div id="details-container-TdaSo6fg2z">${htmlString}</div>`,
			markdown: markdownString,
			plainText: plainString,
			type: types,
		});
	};

	useEffect(() => {
		const handleChange = ({value}: YooptaEventChangePayload) => {
			const isEmptyAll = Object.values(value).every((block) =>
				block.value.every(
					(child) =>
						"children" in child &&
						child.children?.every((grandchild:any) => "text" in grandchild && grandchild.text === "")
				)
			);

			if (isEmptyAll && !isEqual(value, INIT_VALUE)) {
        setResetFlag(true);
				// console.log("Value:", editor.getEditorValue());
				// editor.setEditorValue(INIT_VALUE);
				// console.log("after INIT:", editor.getEditorValue());
        // setEditorKey(v4());
			}
		};
		editor.on("change", handleChange);
		return () => {
			editor.off("change", handleChange);
		};
	}, [editor]);

  useEffect(() => {
    if (resetFlag) {
      editor.setEditorValue(INIT_VALUE);
      setEditorKey(v4());
      setResetFlag(false);
    }
  }, [resetFlag, editor]);
  

	const enhancedPlugins = useMemo(() => {
		return [
			...plugins,
			...(isCustomPlugin ? customPlugins : []),
			Image.extend({
				options: {
					onUpload: onImageUpload
						? async (file) => await onImageUpload(file)
						: async () => ({src: "", alt: "", sizes: {width: 300, height: 300}}),
				},
			}),
			Video.extend({
				options: {
					onUpload: onVideoUpload
						? async (file) => await onVideoUpload.onUpload(file)
						: async () => ({src: "", alt: "", sizes: {width: 300, height: 300}}),
					onUploadPoster: onVideoUpload
						? async (file) => await onVideoUpload.onUploadPoster(file)
						: async () => "https://placehold.co/300x300",
				},
				elementProps: {
					video: (props) => ({
						...props,
						controls: true,
					}),
				},
			}),
			File.extend({
				options: {
					onUpload: onFileUpload
						? async (file) => await onFileUpload(file)
						: async () => ({src: "", format: "", name: "", size: 0}),
				},
			}),
		];
	}, [plugins, onImageUpload, onVideoUpload, onFileUpload]);

	return (
		<div
			ref={selectionRef}
			style={{width: "100%", maxWidth: 1000, ...classNameContainer?.style}}
			className={classNameContainer?.className}
			{...classNameContainer}
		>
			<YooptaEditor
				key={editorKey}
				editor={editor}
				plugins={enhancedPlugins}
				tools={tools}
				marks={marks}
				placeholder={placeholder}
				value={data}
				onChange={(v, opts) => {
					setData(v);
					onChange?.(v, opts);
					serialize(exportAllows);
				}}
				selectionBoxRoot={selectionRef}
				autoFocus={autoFocus}
				id={id}
				className={className}
				readOnly={readOnly}
				width={width}
				style={style}
				onPathChange={onPathChange}
			>
				<></>
			</YooptaEditor>
		</div>
	);
};

export default Editor;
