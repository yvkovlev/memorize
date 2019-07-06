import React from 'react';
import PropTypes from 'prop-types';
import { Button, Cell } from '@vkontakte/vkui';

export default function SetsListItem({ go }) {
  return (
    <Cell>
      <Button size="xl" level="2" onClick={() => go('persik')} data-to="persik">
                Show me the Persik, please
      </Button>
    </Cell>
  );
}

SetsListItem.propTypes = {
  go: PropTypes.func.isRequired,
};
