export function findAppropriateZoom(availableZoomLevels: number[], zoom: number) {
  if (!availableZoomLevels.length) {
    throw new Error('No available zoom levels');
  }
  const zoomBetweenList = availableZoomLevels.map((availableZoom) => Math.abs(availableZoom + 1 - zoom));
  const targetIndex = zoomBetweenList.indexOf(Math.min(...zoomBetweenList));
  return availableZoomLevels[targetIndex];
}
