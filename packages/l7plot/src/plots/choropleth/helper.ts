import { pick } from '@antv/util';
import { ChoroplethOptions, DrillStep, DrillStepConfig } from './types';

export const isEqualDrillSteps = (newSteps: DrillStep[], oldSteps: DrillStep[]) => {
  if (newSteps.length !== oldSteps.length) {
    return false;
  }

  for (let index = 0; index < newSteps.length; index++) {
    const { level, granularity } = newSteps[index];
    if (oldSteps[index].level !== level || oldSteps[index].granularity !== granularity) {
      return false;
    }
  }

  return true;
};

export const getDrillStepDefaultConfig = (options: ChoroplethOptions) => {
  const config = pick<any>(options, ['source', 'color', 'style', 'state', 'label', 'tooltip']) as DrillStepConfig;

  return config;
};
