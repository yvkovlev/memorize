import React, { useState, useCallback } from 'react';
import { Cell, Group, List } from '@vkontakte/vkui';
import { cn } from '@bem-react/classname';

import { cardEditShape } from './CardEdit.shape';

const cnCardEdit = cn('CardEdit');

const CardEdit = (props) => {
  const { term, description, onChange } = props;

  const [innerTerm, setInnerTerm] = useState(term);
  const [innerDescription, setInnerDescription] = useState(description);

  const handleTermChange = useCallback((event) => {
    const newValue = event.target.value;
    setInnerTerm(newValue);
    onChange(newValue, innerDescription);
  }, [onChange, innerDescription]);

  const handleDescriptionChange = useCallback((event) => {
    const newValue = event.target.value;
    setInnerDescription(newValue);
    onChange(innerTerm, newValue);
  }, [onChange, innerTerm]);

  return (
    <div className={cnCardEdit()}>
      <Group>
        <List>
          <Cell>
            <input
              type="text"
              placeholder="Термин"
              className={cnCardEdit('Input', ['subhead'])}
              onChange={handleTermChange}
            />
          </Cell>
          <div className={cnCardEdit('HorizontalSeparator')} />
          <Cell>
            <input
              type="text"
              placeholder="Определение"
              className={cnCardEdit('Input', ['subhead'])}
              onChange={handleDescriptionChange}
            />
          </Cell>
        </List>
      </Group>
    </div>
  );
};

CardEdit.propTypes = cardEditShape;

export default CardEdit;
