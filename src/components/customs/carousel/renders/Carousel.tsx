import { Plus } from 'lucide-react';
import { CarouselElement } from 'src/types/slate-custom-types';

import {
  Elements,
  PluginElementRenderProps,
  useBlockData,
  useYooptaEditor,
} from '@yoopta/editor';

import { Button } from '../../../../components/ui/button';
import {
  Carousel as CarouselRoot,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '../../../../components/ui/carousel';
import { CarouselBlockOptions } from '../components/CarouselBlockOptions';

const Carousel = ({ children, element, blockId, attributes }: PluginElementRenderProps) => {
  const editor = useYooptaEditor();
  const block = useBlockData(blockId);
  const itemElement = element as CarouselElement;

  const onAddCarouselItem = () => {
    Elements.createElement(editor, blockId, { type: 'carousel-item' }, { path: 'next', focus: true, split: false });
  };

  const orientation = itemElement.props?.orientation;
  const loop = itemElement.props?.loop;
  const dragFree = itemElement.props?.dragFree;

  return (
    <CarouselRoot {...attributes} className="yoopta-carousel" opts={{ loop, dragFree }} orientation={orientation}>
      <CarouselContent >{children}</CarouselContent>
      <CarouselPrevious contentEditable={false} />
      <CarouselNext contentEditable={false} />
      {!editor.readOnly && (
        <>
          <Button className='mt-2 mx-auto' variant="outline" type="button" onClick={onAddCarouselItem}>
            <Plus /> Add more card
          </Button>
          <CarouselBlockOptions props={itemElement.props} block={block} editor={editor} />
        </>
      )}
    </CarouselRoot>
  );
};

export { Carousel };
