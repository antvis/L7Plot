type PendingStyleAttributes = Array<{
  attributeName: string;
  attributeField: any;
  attributeValues?: any;
}>;

export const getLayerStyleAttribute = (attributes: PendingStyleAttributes, attributeName: string) => {
  const attribute = attributes
    .slice()
    .reverse()
    .find((attributes) => attributes.attributeName === attributeName);
  return attribute;
};
