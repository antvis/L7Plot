import { bisectLeft } from 'd3-array';

export function findAppropriateZoom(availableZoomLevels: number[], zoom: number) {
  if (!availableZoomLevels.length) {
    throw new Error('No available zoom levels');
  }
  return availableZoomLevels[
    Math.min(bisectLeft(availableZoomLevels, Math.floor(zoom)), availableZoomLevels.length - 1)
  ];
}
