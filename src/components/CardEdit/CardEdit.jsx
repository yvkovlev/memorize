import React from 'react';
import { Cell, Group, List } from '@vkontakte/vkui';

const CardEdit = () => {
  return (
    <div className="CardEdit">
      <Group>
        <List>
          <Cell>
            <input type="text" placeholder="Термин" className="CardEdit__input subhead" />
          </Cell>
          <div className="ViewSet__horizontalSeparator" />
          <Cell>
            <input type="text" placeholder="Определение" className="CardEdit__input subhead" />
          </Cell>
        </List>
      </Group>
    </div>
  );
};

export default CardEdit;
