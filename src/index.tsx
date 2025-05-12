export type { ApiContextProps, ResourceConfig } from './api/apiProvider';
export { ApiProvider, useApiContext } from './api/apiProvider';

export type { MutationOptions } from './api/hooks/useMutation';
export { useApiMutation } from './api/hooks/useMutation';

export { useApi } from './api/hooks/useApi';

export { createInitValue, INIT_VALUE } from './components/init';
export { CarouselPlugin } from './components/customs/carousel/index';
export {
  CarouselBlockOptions,
} from './components/customs/carousel/components/CarouselBlockOptions';
export { Carousel } from './components/customs/carousel/renders/Carousel';
export {
  CarouselItem,
} from './components/customs/carousel/renders/CarouselItem';
export {
  CarouselItemDescription,
} from './components/customs/carousel/renders/CarouselItemDescription';
export {
  CarouselItemImage,
} from './components/customs/carousel/renders/CarouselItemImage';
export {
  CarouselItemTitle,
} from './components/customs/carousel/renders/CarouselItemTitle';

export {
  DEFAULT_CUSTOM_PLUGINS,
  DEFAULT_MARKS,
  DEFAULT_PLUGINS,
  DEFAULT_TOOLS,
  Editor,
} from './components/editor';

export type { EditorProps } from './components/editor';

export { useIsMobile } from './hooks/use-mobile';
export type {
  CarouselElement,
  CarouselElementProps,
  CarouselItemDescriptionElement,
  CarouselItemElement,
  CarouselItemImageElement,
  CarouselItemImageElementProps,
  CarouselItemTitleElement,
} from './types/slate-custom-types';