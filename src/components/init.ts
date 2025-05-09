import { v4 as uuidv4 } from 'uuid';

import { YooptaContentValue } from '@yoopta/editor';

export const createInitValue = (): YooptaContentValue => {
  const blockId = uuidv4();
  const childId = uuidv4();

  return {
    [blockId]: {
      id: blockId,
      type: 'Paragraph',
      meta: {
        order: 0,
        depth: 0,
        align: 'left',
      },
      value: [
        {
          id: childId,
          type: 'Paragraph',
          children: [{ text: '' }],
        },
      ],
    },
  };
};

export const INIT_VALUE = createInitValue();
