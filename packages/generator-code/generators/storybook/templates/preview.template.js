import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11Y } from '@storybook/addon-a11y';
import { withBackgrounds } from '@storybook/addon-backgrounds';

addDecorator(
  withKnobs,
);
addDecorator(
  withA11Y,
);
addDecorator(
  withBackgrounds,
);

addParameters({
  options: {
    showRoots: true,
  },
  backgrounds: [{
    name: 'light',
    value: '#fff',
    default: true,
  }, {
    name: 'dark',
    value: '#000',
  }],
});
