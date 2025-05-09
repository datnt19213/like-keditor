import { SlateElement } from '@yoopta/editor';

export type CarouselElementProps = {
  loop: boolean;
  orientation: 'horizontal' | 'vertical';
  dragFree: boolean;
};

export type CarouselItemImageElementProps = {
  src: null | string;
};

// Đảm bảo các kiểu SlateElement bạn định nghĩa có props
export type CarouselElement = SlateElement<'carousel', CarouselElementProps> & {
  id: string;
  children: any[];
  props: CarouselElementProps;
};

export type CarouselItemElement = SlateElement<'carousel-item'> & {
  id: string;
  children: any[];
  props?: Record<string, any>;
};

export type CarouselItemImageElement = SlateElement<'carousel-item-image', CarouselItemImageElementProps> & {
  id: string;
  children: any[];
  props: CarouselItemImageElementProps;
};

export type CarouselItemTitleElement = SlateElement<'carousel-item-title'> & {
  id: string;
  children: any[];
  props?: Record<string, any>;
};

export type CarouselItemDescriptionElement = SlateElement<'carousel-item-description'> & {
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