import {
  FlipHorizontal,
  FlipVertical,
  LoaderPinwheel,
  Repeat,
} from 'lucide-react';

import {
  Elements,
  UI,
  YooEditor,
  YooptaBlockData,
} from '@yoopta/editor';

import { CarouselElementProps } from '../../../../types/slate-custom-types';

const { ExtendedBlockActions, BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptionsSeparator } = UI;

type Props = {
  editor: YooEditor;
  block: YooptaBlockData;
  props: CarouselElementProps;
};

const CarouselBlockOptions = ({ editor, block, props }: Props) => {
  const orientation = props.orientation;
  const loop = props.loop;
  const freeDragable = props.dragFree;

  const isHorizontal = orientation === 'horizontal';
  const isLoop = loop;
  const isFreeDragable = freeDragable;

  const switchFreeDragable = () => {
    Elements.updateElement(editor, block.id, { type: 'carousel', props: { dragFree: !isFreeDragable } });
  };
  const switchLoop = () => {
    Elements.updateElement(editor, block.id, { type: 'carousel', props: { loop: !isLoop } });
  };
  const switchOrientation = () => {
    Elements.updateElement(editor, block.id, {
      type: 'carousel',
      props: { orientation: isHorizontal ? 'vertical' : 'horizontal' },
    });
  };

  return (
    <ExtendedBlockActions
      onClick={() => editor.setPath({ current: block.meta.order })}
      className="yoopta-carousel-options"
    >
      <BlockOptionsSeparator />
      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button justify-between" onClick={switchFreeDragable}>
            <span className="flex">
              <LoaderPinwheel width={16} height={16} className="w-4 h-4 mr-2" />
              {freeDragable ? 'Diable free dragable' : 'Free dragable'}
            </span>
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button justify-between" onClick={switchLoop}>
            <span className="flex">
              <Repeat width={16} height={16} className="w-4 h-4 mr-2" />
              {loop ? 'Disable loop' : 'Make it loop'}
            </span>
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button type="button" className="yoopta-block-options-button justify-between" onClick={switchOrientation}>
            <span className="flex">
              {isHorizontal ? (
                <FlipHorizontal width={16} height={16} className="w-4 h-4 mr-2" />
              ) : (
                <FlipVertical width={16} height={16} className="w-4 h-4 mr-2" />
              )}
              {isHorizontal ? 'Make it vertical' : 'Make it horizontal'}
            </span>
          </button>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </ExtendedBlockActions>
  );
};

export { CarouselBlockOptions };
