import { GalleryHorizontal } from 'lucide-react';

import { YooptaPlugin } from '@yoopta/editor';

import { Carousel } from './renders/Carousel';
import { CarouselItem } from './renders/CarouselItem';
import { CarouselItemDescription } from './renders/CarouselItemDescription';
import { CarouselItemImage } from './renders/CarouselItemImage';
import { CarouselItemTitle } from './renders/CarouselItemTitle';

const CarouselPlugin = new YooptaPlugin({
  type: 'Carousel',
  elements: {
    carousel: {
      render: Carousel,
      children: ['carousel-item'],
      asRoot: true,
      props: {
        loop: false,
        orientation: 'horizontal',
      },
    },
    'carousel-item': {
      render: CarouselItem,
      children: ['carousel-item-title', 'carousel-item-description', 'carousel-item-image'],
    },
    'carousel-item-image': {
      render: CarouselItemImage,
      props: {
        nodeType: 'void',
        src: null,
      },
    },
    'carousel-item-title': {
      render: CarouselItemTitle,
    },
    'carousel-item-description': {
      render: CarouselItemDescription,
    },
  },
  options: {
    display: {
      title: 'Carousel',
      description: 'Create a carousel',
      icon: <GalleryHorizontal size={24} />,
    },
    shortcuts: ['carousel'],
  },
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['CAROUSEL'],
      },
    },
  },
} as any);

export { CarouselPlugin };
