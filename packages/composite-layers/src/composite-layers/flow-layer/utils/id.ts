let locationId = 0;
export const getLocationId = () => {
  return String(++locationId);
};

let flowId = 0;
export const getFlowId = () => {
  return String(++flowId);
};
