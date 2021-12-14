// import { DotLayer } from '../dot-layer';
import { DotLayer } from '../../layers/dot-layer';

function buildOptions(data, params) {
  const { lng = 'lng', lat = 'lat' } = params;
  return {
    source: {
      data,
      parser: {
        x: lng,
        y: lat,
        type: 'json',
      },
    },
    ...params,
  };
}

export class SimplePointLayer extends DotLayer {
  private params: any;
  constructor(data, params) {
    const option = buildOptions(data, params);
    super(option);
  }
}
