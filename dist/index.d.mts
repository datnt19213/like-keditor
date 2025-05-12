import React$1 from 'react';
import { Method } from 'axios';
import * as _yoopta_editor from '@yoopta/editor';
import { YooptaContentValue, YooptaPlugin, SlateElement, YooEditor, YooptaBlockData, PluginElementRenderProps, YooptaOnChangeOptions, YooptaPath } from '@yoopta/editor';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as _yoopta_link_tool_dist_types from '@yoopta/link-tool/dist/types';
import * as _yoopta_action_menu_list from '@yoopta/action-menu-list';
import * as _yoopta_toolbar from '@yoopta/toolbar';
import * as _yoopta_toolbar_dist_types from '@yoopta/toolbar/dist/types';
import * as _yoopta_marks_dist_components_highlight from '@yoopta/marks/dist/components/highlight';
import * as _yoopta_editor_dist_plugins_types from '@yoopta/editor/dist/plugins/types';

type ResourceConfig = {
    [key: string]: string;
};
type ApiContextProps = {
    host: string;
    resources: ResourceConfig;
};
declare const ApiProvider: React$1.FC<{
    children: React$1.ReactNode;
    host: string;
    resources: ResourceConfig;
}>;
declare const useApiContext: () => ApiContextProps;

type MutationOptions = {
    method?: Method;
    onSuccess?: (data: any) => void;
    onError?: (err: any) => void;
};
declare const useApiMutation: (resourceKey: string, options?: MutationOptions) => {
    mutate: (body?: any, extraParams?: Record<string, any>) => Promise<any>;
    loading: boolean;
    error: any;
    data: any;
};

declare const useApi: <T>(resourceKey: string, params?: Record<string, any>, options?: {
    skip?: boolean;
}) => {
    data: T | null;
    loading: boolean;
    error: any;
};

declare const createInitValue: () => YooptaContentValue;
declare const INIT_VALUE: YooptaContentValue;

declare const CarouselPlugin: YooptaPlugin<Record<string, _yoopta_editor.SlateElement<string, any>>, Record<string, unknown>>;

type CarouselElementProps = {
  loop: boolean;
  orientation: 'horizontal' | 'vertical';
  dragFree: boolean;
};

type CarouselItemImageElementProps = {
  src: null | string;
};

// Đảm bảo các kiểu SlateElement bạn định nghĩa có props
type CarouselElement = SlateElement<'carousel', CarouselElementProps> & {
  id: string;
  children: any[];
  props: CarouselElementProps;
};

type CarouselItemElement = SlateElement<'carousel-item'> & {
  id: string;
  children: any[];
  props?: Record<string, any>;
};

type CarouselItemImageElement = SlateElement<'carousel-item-image', CarouselItemImageElementProps> & {
  id: string;
  children: any[];
  props: CarouselItemImageElementProps;
};

type CarouselItemTitleElement = SlateElement<'carousel-item-title'> & {
  id: string;
  children: any[];
  props?: Record<string, any>;
};

type CarouselItemDescriptionElement = SlateElement<'carousel-item-description'> & {
  id: string;
  children: any[];
  props?: Record<string, any>;
};


declare module 'slate' {
  interface CustomTypes {
    Element:
      | CarouselElement
      | CarouselItemElement
      | CarouselItemImageElement
      | CarouselItemTitleElement
      | CarouselItemDescriptionElement
      | AccordionListElement
      | AccordionItemElement
      | AccordionListItemHeadingElement
      | AccordionListItemContentElement;
  }
}

type Props = {
    editor: YooEditor;
    block: YooptaBlockData;
    props: CarouselElementProps;
};
declare const CarouselBlockOptions: ({ editor, block, props }: Props) => react_jsx_runtime.JSX.Element;

declare const Carousel: ({ children, element, blockId, attributes }: PluginElementRenderProps) => react_jsx_runtime.JSX.Element;

declare const CarouselItem: ({ element, blockId, attributes, children }: PluginElementRenderProps) => react_jsx_runtime.JSX.Element;

declare const CarouselItemDescription: (props: PluginElementRenderProps) => react_jsx_runtime.JSX.Element;

declare const CarouselItemImage: ({ element, children, attributes, blockId }: PluginElementRenderProps) => react_jsx_runtime.JSX.Element;

declare const CarouselItemTitle: (props: PluginElementRenderProps) => react_jsx_runtime.JSX.Element;

interface EditorProps {
    value?: YooptaContentValue;
    onChange?: (value: YooptaContentValue, options: YooptaOnChangeOptions) => void;
    onExport?: (data: {
        type: ("html" | "markdown" | "plainText")[];
        html: string;
        markdown: string;
        plainText: string;
    }) => void;
    onSelectionRef?: (ref: any) => void;
    onImageUpload?: (file: File) => Promise<{
        src: string;
        alt: string;
        sizes: {
            width: number;
            height: number;
        };
    }>;
    onVideoUpload?: {
        onUpload: (file: File) => Promise<{
            src: string;
            alt: string;
            sizes: {
                width: number;
                height: number;
            };
        }>;
        onUploadPoster: (file: File) => Promise<string>;
    };
    onFileUpload?: (file: File) => Promise<{
        src: string;
        format: string;
        name: string;
        size: number;
    }>;
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
declare const DEFAULT_PLUGINS: any[];
declare const DEFAULT_CUSTOM_PLUGINS: _yoopta_editor.YooptaPlugin<Record<string, _yoopta_editor.SlateElement<string, any>>, Record<string, unknown>>[];
declare const DEFAULT_MARKS: (_yoopta_editor.YooptaMark<{
    children: any;
    leaf: _yoopta_editor_dist_plugins_types.ExtendedLeaf<"bold", boolean>;
}> | _yoopta_editor.YooptaMark<{
    children: any;
    leaf: _yoopta_editor_dist_plugins_types.ExtendedLeaf<"italic", boolean>;
}> | _yoopta_editor.YooptaMark<{
    children: any;
    leaf: _yoopta_editor_dist_plugins_types.ExtendedLeaf<"code", boolean>;
}> | _yoopta_editor.YooptaMark<{
    children: any;
    leaf: _yoopta_editor_dist_plugins_types.ExtendedLeaf<"underline", boolean>;
}> | _yoopta_editor.YooptaMark<{
    children: any;
    leaf: _yoopta_editor_dist_plugins_types.ExtendedLeaf<"strike", boolean>;
}> | _yoopta_editor.YooptaMark<_yoopta_editor.YooptaMarkProps<"highlight", _yoopta_marks_dist_components_highlight.LeafColorProps>>)[];
declare const DEFAULT_TOOLS: {
    Toolbar: {
        tool: ({ render }: _yoopta_toolbar_dist_types.ToolbarToolProps) => react_jsx_runtime.JSX.Element | null;
        render: ({ activeBlock, editor, toggleHoldToolbar }: _yoopta_toolbar.ToolbarRenderProps) => react_jsx_runtime.JSX.Element;
    };
    ActionMenu: {
        tool: ({ items, render }: _yoopta_action_menu_list.ActionMenuToolProps) => react_jsx_runtime.JSX.Element;
        render: ({ actions, editor, empty, getItemProps, getRootProps, view, }: _yoopta_action_menu_list.ActionMenuRenderProps) => react_jsx_runtime.JSX.Element;
    };
    LinkTool: {
        tool: () => null;
        render: (props: _yoopta_link_tool_dist_types.LinkToolRenderProps) => react_jsx_runtime.JSX.Element;
    };
};
declare const Editor: React.FC<EditorProps>;

declare function useIsMobile(): boolean;

export { type ApiContextProps, ApiProvider, Carousel, CarouselBlockOptions, type CarouselElement, type CarouselElementProps, CarouselItem, CarouselItemDescription, type CarouselItemDescriptionElement, type CarouselItemElement, CarouselItemImage, type CarouselItemImageElement, type CarouselItemImageElementProps, CarouselItemTitle, type CarouselItemTitleElement, CarouselPlugin, DEFAULT_CUSTOM_PLUGINS, DEFAULT_MARKS, DEFAULT_PLUGINS, DEFAULT_TOOLS, Editor, type EditorProps, INIT_VALUE, type MutationOptions, type ResourceConfig, createInitValue, useApi, useApiContext, useApiMutation, useIsMobile };
