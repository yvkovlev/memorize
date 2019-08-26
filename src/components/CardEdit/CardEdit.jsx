import React from 'react';
import { Cell, Group, List } from '@vkontakte/vkui';
import { cn } from '@bem-react/classname';

const cnCardEdit = cn('CardEdit');

const CardEdit = () => (
  <div className={cnCardEdit()}>
    <Group>
      <List>
        <Cell>
          <input
            type="text"
            placeholder="Термин"
            className={cnCardEdit('Input', ['subhead'])}
          />
        </Cell>
        <div className={cnCardEdit('HorizontalSeparator')} />
        <Cell>
          <input
            type="text"
            placeholder="Определение"
            className={cnCardEdit('Input', ['subhead'])}
          />
        </Cell>
      </List>
    </Group>
  </div>
);

export default CardEdit;
