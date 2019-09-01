const { REACT_APP_BUILD_TYPE, REACT_APP_VERSION } = process.env;

export const PANEL_HEADER = REACT_APP_BUILD_TYPE === 'test' ? `Memorize v${REACT_APP_VERSION}` : 'Memorize';

export default {
  PANEL_HEADER,
};
