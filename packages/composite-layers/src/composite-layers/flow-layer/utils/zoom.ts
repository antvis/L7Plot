import { minBy } from 'lodash-es';

export function findAppropriateZoom(availableZoomLevels: number[], zoom: number) {
  if (!availableZoomLevels.length) {
    throw new Error('No available zoom levels');
  }
  return minBy(availableZoomLevels, (availableZoom) => Math.abs(availableZoom + 1 - zoom));
}
