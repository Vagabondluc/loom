
import { ComponentDefinition } from '../../types';
import { layoutComponents } from './registry/layout';
import { daisyUiComponents } from './registry/daisyui';
import { mediaComponents } from './registry/media';
import { patternComponents } from './registry/patterns';
import { typographyComponents } from './registry/typography';
import { prelineComponents } from './registry/preline';
import { dataComponents } from './registry/data';
import { formComponents } from './registry/forms';
import { placeholderComponents } from './registry/placeholders';

export const COMPONENT_REGISTRY: Record<string, ComponentDefinition> = {
  ...layoutComponents,
  ...daisyUiComponents,
  ...mediaComponents,
  ...patternComponents,
  ...typographyComponents,
  ...prelineComponents,
  ...dataComponents,
  ...formComponents,
  ...placeholderComponents
};
