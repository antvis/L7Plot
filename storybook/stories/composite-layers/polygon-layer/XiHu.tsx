import React, { Component } from 'react';
import { Scene, Mapbox } from '@antv/l7';
import { PolygonLayer } from '@antv/l7-composite-layers';

const data = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        color: 'pink',
        adcode: 330106,
        name: '西湖区',
        center: [120.147376, 30.272934],
        centroid: [120.08362, 30.200766],
        childrenNum: 0,
        level: 'district',
        acroutes: [100000, 330000, 330100],
        parent: { adcode: 330100 },
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [119.996338, 30.181541],
              [119.999002, 30.182304],
              [120.002762, 30.18214],
              [120.005452, 30.182351],
              [120.011438, 30.181852],
              [120.013484, 30.181042],
              [120.014919, 30.179824],
              [120.015832, 30.178504],
              [120.016146, 30.177072],
              [120.015537, 30.17553],
              [120.014399, 30.173818],
              [120.014841, 30.172664],
              [120.017764, 30.168412],
              [120.018537, 30.166575],
              [120.018922, 30.165196],
              [120.018434, 30.162966],
              [120.016683, 30.161082],
              [120.015352, 30.160175],
              [120.014813, 30.158915],
              [120.015847, 30.15651],
              [120.016745, 30.154953],
              [120.017189, 30.153172],
              [120.017032, 30.150824],
              [120.016422, 30.14894],
              [120.014802, 30.146654],
              [120.012793, 30.144495],
              [120.011653, 30.142778],
              [120.008868, 30.136723],
              [120.00878, 30.134206],
              [120.007753, 30.131572],
              [120.007005, 30.130029],
              [120.003818, 30.12659],
              [120.003366, 30.124126],
              [120.00253, 30.121789],
              [120.001948, 30.119566],
              [120.00057, 30.117006],
              [120.000475, 30.116041],
              [120.00079, 30.115344],
              [120.001832, 30.114353],
              [120.002547, 30.114281],
              [120.005444, 30.115424],
              [120.007038, 30.115599],
              [120.010945, 30.116257],
              [120.013921, 30.116182],
              [120.016418, 30.115713],
              [120.017471, 30.11485],
              [120.017716, 30.113187],
              [120.016558, 30.110209],
              [120.016471, 30.108321],
              [120.017775, 30.106708],
              [120.019151, 30.10567],
              [120.02325, 30.106334],
              [120.025223, 30.105517],
              [120.026982, 30.103388],
              [120.029532, 30.100507],
              [120.030435, 30.098844],
              [120.03054, 30.096601],
              [120.030844, 30.094768],
              [120.031897, 30.093786],
              [120.033864, 30.092972],
              [120.036369, 30.092558],
              [120.039604, 30.092817],
              [120.041258, 30.093094],
              [120.042711, 30.092914],
              [120.043633, 30.092161],
              [120.044267, 30.089988],
              [120.044883, 30.08637],
              [120.046058, 30.085787],
              [120.047179, 30.085895],
              [120.049126, 30.086845],
              [120.05117, 30.089213],
              [120.052946, 30.091664],
              [120.0549, 30.092717],
              [120.057491, 30.093036],
              [120.059516, 30.092794],
              [120.061758, 30.091853],
              [120.067918, 30.086786],
              [120.073011, 30.083663],
              [120.076753, 30.080867],
              [120.081243, 30.079226],
              [120.08461, 30.078273],
              [120.087302, 30.078165],
              [120.091581, 30.078482],
              [120.097957, 30.079595],
              [120.105062, 30.080439],
              [120.108946, 30.080622],
              [120.115093, 30.082224],
              [120.118136, 30.083796],
              [120.119801, 30.085212],
              [120.123811, 30.089466],
              [120.12474, 30.09295],
              [120.129037, 30.097492],
              [120.130346, 30.099302],
              [120.134806, 30.097667],
              [120.146876, 30.088669],
              [120.150452, 30.091459],
              [120.161999, 30.09798],
              [120.170362, 30.101548],
              [120.177293, 30.102608],
              [120.182165, 30.104821],
              [120.183005, 30.1065],
              [120.182955, 30.108454],
              [120.181846, 30.111463],
              [120.178731, 30.115968],
              [120.177728, 30.117115],
              [120.174049, 30.11888],
              [120.16832, 30.121794],
              [120.160021, 30.126363],
              [120.156991, 30.128539],
              [120.146144, 30.137175],
              [120.138595, 30.142078],
              [120.133043, 30.147955],
              [120.130376, 30.151166],
              [120.127475, 30.15601],
              [120.126002, 30.159456],
              [120.125127, 30.163251],
              [120.124589, 30.16726],
              [120.124391, 30.172198],
              [120.124627, 30.177352],
              [120.125112, 30.179444],
              [120.12595, 30.181111],
              [120.126671, 30.182831],
              [120.128041, 30.184778],
              [120.129668, 30.18685],
              [120.131765, 30.188744],
              [120.13412, 30.190586],
              [120.136943, 30.19197],
              [120.140174, 30.192838],
              [120.138173, 30.195123],
              [120.137109, 30.198094],
              [120.137163, 30.199819],
              [120.137553, 30.201017],
              [120.138729, 30.201879],
              [120.140036, 30.20252],
              [120.141024, 30.203324],
              [120.141544, 30.204065],
              [120.141864, 30.205268],
              [120.141076, 30.206472],
              [120.138436, 30.20795],
              [120.138358, 30.209614],
              [120.138755, 30.210298],
              [120.139407, 30.210473],
              [120.143614, 30.209688],
              [120.145259, 30.209577],
              [120.146316, 30.209805],
              [120.147363, 30.210268],
              [120.148808, 30.211244],
              [120.150176, 30.21285],
              [120.156834, 30.222485],
              [120.160349, 30.227487],
              [120.160487, 30.22828],
              [120.159717, 30.22966],
              [120.159468, 30.231105],
              [120.159233, 30.231585],
              [120.157372, 30.23286],
              [120.155339, 30.233766],
              [120.154385, 30.234412],
              [120.154047, 30.235535],
              [120.154161, 30.23622],
              [120.154602, 30.236245],
              [120.154116, 30.23729],
              [120.154454, 30.238463],
              [120.154178, 30.239569],
              [120.154578, 30.241016],
              [120.155468, 30.24203],
              [120.15855, 30.244808],
              [120.160202, 30.246604],
              [120.159259, 30.246222],
              [120.158066, 30.246269],
              [120.157979, 30.246721],
              [120.158602, 30.247721],
              [120.15983, 30.247843],
              [120.159026, 30.248234],
              [120.159718, 30.249387],
              [120.161408, 30.250263],
              [120.161884, 30.250948],
              [120.162515, 30.251134],
              [120.162464, 30.251666],
              [120.161822, 30.252788],
              [120.16003, 30.255203],
              [120.159235, 30.256389],
              [120.158352, 30.256461],
              [120.156941, 30.258013],
              [120.156987, 30.258967],
              [120.15675, 30.259136],
              [120.156465, 30.2603],
              [120.158464, 30.259136],
              [120.157557, 30.262417],
              [120.157504, 30.26321],
              [120.157193, 30.263642],
              [120.155167, 30.270302],
              [120.155421, 30.270809],
              [120.154943, 30.271047],
              [120.154632, 30.272167],
              [120.154415, 30.274509],
              [120.153762, 30.275733],
              [120.151548, 30.277801],
              [120.150943, 30.278507],
              [120.149282, 30.28206],
              [120.147585, 30.284346],
              [120.14614, 30.286593],
              [120.144331, 30.290744],
              [120.143241, 30.292118],
              [120.141802, 30.293193],
              [120.141178, 30.293908],
              [120.138321, 30.293351],
              [120.135196, 30.292631],
              [120.133895, 30.292572],
              [120.132519, 30.292788],
              [120.131175, 30.293658],
              [120.129575, 30.294202],
              [120.128707, 30.294287],
              [120.124488, 30.293911],
              [120.121602, 30.293442],
              [120.118024, 30.292644],
              [120.116923, 30.292522],
              [120.112693, 30.292281],
              [120.109251, 30.291991],
              [120.106499, 30.292273],
              [120.105497, 30.299227],
              [120.105536, 30.300227],
              [120.102058, 30.300117],
              [120.102088, 30.301962],
              [120.102333, 30.303278],
              [120.102825, 30.304677],
              [120.102559, 30.306904],
              [120.102628, 30.310763],
              [120.10209, 30.312179],
              [120.102038, 30.312697],
              [120.100658, 30.315608],
              [120.098881, 30.318755],
              [120.09823, 30.320256],
              [120.097752, 30.320935],
              [120.096365, 30.32343],
              [120.095585, 30.325485],
              [120.093268, 30.326458],
              [120.092001, 30.326064],
              [120.090569, 30.327347],
              [120.090145, 30.328294],
              [120.090257, 30.328959],
              [120.089182, 30.330197],
              [120.088486, 30.330526],
              [120.087446, 30.330177],
              [120.08556, 30.331324],
              [120.084685, 30.332058],
              [120.084554, 30.332445],
              [120.083608, 30.333357],
              [120.08313, 30.334124],
              [120.082299, 30.334902],
              [120.081717, 30.335921],
              [120.081805, 30.336179],
              [120.082921, 30.336619],
              [120.082688, 30.337774],
              [120.082811, 30.338848],
              [120.080382, 30.338555],
              [120.079746, 30.338605],
              [120.080067, 30.342626],
              [120.078796, 30.342978],
              [120.078818, 30.343623],
              [120.077844, 30.343974],
              [120.07621, 30.345284],
              [120.075889, 30.346248],
              [120.074657, 30.347743],
              [120.073285, 30.348663],
              [120.072815, 30.348693],
              [120.070349, 30.350402],
              [120.069445, 30.350703],
              [120.068133, 30.35265],
              [120.067638, 30.353688],
              [120.067629, 30.354768],
              [120.067334, 30.355444],
              [120.065178, 30.355303],
              [120.064963, 30.354957],
              [120.065361, 30.352813],
              [120.063668, 30.35213],
              [120.062094, 30.353209],
              [120.060868, 30.353351],
              [120.060782, 30.351855],
              [120.060608, 30.351504],
              [120.05952, 30.351592],
              [120.058462, 30.35134],
              [120.056808, 30.351313],
              [120.055027, 30.351562],
              [120.05395, 30.351404],
              [120.053748, 30.350753],
              [120.053211, 30.350493],
              [120.050192, 30.349867],
              [120.049576, 30.350584],
              [120.049455, 30.351656],
              [120.048673, 30.353528],
              [120.047228, 30.353852],
              [120.046463, 30.353755],
              [120.046515, 30.35221],
              [120.042496, 30.351637],
              [120.0386, 30.350953],
              [120.036547, 30.35095],
              [120.032798, 30.351637],
              [120.032128, 30.351033],
              [120.029448, 30.350011],
              [120.023889, 30.348358],
              [120.023991, 30.347644],
              [120.024523, 30.346677],
              [120.025653, 30.34578],
              [120.025983, 30.345223],
              [120.025541, 30.342471],
              [120.026332, 30.339264],
              [120.026993, 30.337685],
              [120.027185, 30.335907],
              [120.026872, 30.334387],
              [120.026427, 30.333271],
              [120.025158, 30.33308],
              [120.018935, 30.332645],
              [120.017622, 30.332376],
              [120.017813, 30.329729],
              [120.019631, 30.329654],
              [120.021354, 30.329089],
              [120.021266, 30.328773],
              [120.022285, 30.326768],
              [120.023564, 30.326737],
              [120.023624, 30.325521],
              [120.023398, 30.319968],
              [120.023859, 30.318184],
              [120.024242, 30.317367],
              [120.023885, 30.316195],
              [120.022606, 30.315672],
              [120.020743, 30.31589],
              [120.02056, 30.31568],
              [120.021247, 30.313051],
              [120.021789, 30.311871],
              [120.023277, 30.312023],
              [120.024643, 30.311215],
              [120.026696, 30.310993],
              [120.027243, 30.310142],
              [120.025948, 30.307015],
              [120.026121, 30.305954],
              [120.027443, 30.305148],
              [120.028503, 30.30384],
              [120.03081, 30.299842],
              [120.031983, 30.300416],
              [120.034986, 30.301627],
              [120.040013, 30.303438],
              [120.042083, 30.304098],
              [120.042936, 30.304161],
              [120.044092, 30.303848],
              [120.046937, 30.303455],
              [120.048006, 30.303189],
              [120.048807, 30.302679],
              [120.05191, 30.299513],
              [120.053162, 30.29915],
              [120.05378, 30.298776],
              [120.054327, 30.297415],
              [120.054796, 30.295243],
              [120.052962, 30.293844],
              [120.051988, 30.292315],
              [120.051622, 30.290547],
              [120.052274, 30.289322],
              [120.053866, 30.289328],
              [120.05457, 30.288995],
              [120.056726, 30.288397],
              [120.056604, 30.287884],
              [120.055796, 30.286285],
              [120.054196, 30.284867],
              [120.052813, 30.282894],
              [120.050439, 30.27769],
              [120.049804, 30.275933],
              [120.049804, 30.274259],
              [120.050246, 30.273855],
              [120.052378, 30.273234],
              [120.053203, 30.273386],
              [120.056489, 30.273367],
              [120.057263, 30.268351],
              [120.057723, 30.257292],
              [120.058521, 30.252805],
              [120.055313, 30.251483],
              [120.055585, 30.249789],
              [120.055645, 30.247339],
              [120.055236, 30.24539],
              [120.052679, 30.245332],
              [120.052574, 30.244378],
              [120.05222, 30.2435],
              [120.051279, 30.243189],
              [120.048324, 30.24299],
              [120.046168, 30.242721],
              [120.044305, 30.240478],
              [120.044271, 30.239064],
              [120.044531, 30.238052],
              [120.043515, 30.237126],
              [120.043043, 30.237229],
              [120.041165, 30.23612],
              [120.040633, 30.23284],
              [120.038565, 30.233015],
              [120.037547, 30.232386],
              [120.032145, 30.229699],
              [120.0309, 30.230478],
              [120.030482, 30.230481],
              [120.029541, 30.229921],
              [120.025087, 30.228479],
              [120.018587, 30.225607],
              [120.018082, 30.225172],
              [120.016855, 30.224828],
              [120.016698, 30.224262],
              [120.017561, 30.223494],
              [120.018022, 30.222516],
              [120.018438, 30.220907],
              [120.018935, 30.220566],
              [120.018899, 30.219746],
              [120.01917, 30.219285],
              [120.019771, 30.219091],
              [120.020187, 30.218567],
              [120.02017, 30.217882],
              [120.018376, 30.216454],
              [120.01748, 30.216704],
              [120.016698, 30.217444],
              [120.015444, 30.218068],
              [120.013747, 30.216202],
              [120.012799, 30.216662],
              [120.013069, 30.217724],
              [120.012121, 30.218631],
              [120.011563, 30.218653],
              [120.010867, 30.219726],
              [120.010779, 30.220566],
              [120.010363, 30.22119],
              [120.009274, 30.221631],
              [120.00864, 30.221678],
              [120.007768, 30.221409],
              [120.007124, 30.220794],
              [120.007516, 30.220242],
              [120.007682, 30.219441],
              [120.008673, 30.218905],
              [120.009396, 30.217591],
              [120.009988, 30.215634],
              [120.011475, 30.215517],
              [120.012312, 30.214566],
              [120.013112, 30.21407],
              [120.015715, 30.213424],
              [120.016062, 30.213487],
              [120.016584, 30.214469],
              [120.018029, 30.214314],
              [120.017994, 30.21308],
              [120.01749, 30.211796],
              [120.017158, 30.21166],
              [120.016026, 30.211976],
              [120.01528, 30.21169],
              [120.014688, 30.210897],
              [120.013355, 30.210254],
              [120.008909, 30.209431],
              [120.007167, 30.208751],
              [120.006245, 30.207464],
              [120.006262, 30.206635],
              [120.00654, 30.205385],
              [120.007367, 30.204059],
              [120.009273, 30.200199],
              [120.00923, 30.196932],
              [120.00909, 30.19562],
              [120.007619, 30.194192],
              [120.005452, 30.193465],
              [120.003449, 30.19187],
              [120.001309, 30.188009],
              [119.996338, 30.181541],
            ],
          ],
        ],
      },
    },
  ],
};

class XiHu extends Component {
  public scene: Scene | undefined;
  public choroplethLayer: PolygonLayer | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    this.scene = new Scene({
      id: 'container',
      map: new Mapbox({
        pitch: 0,
        style: 'light',
        zoom: 3,
        center: [120.19660949707033, 30.234747338474293],
      }),
    });

    this.choroplethLayer = new PolygonLayer({
      source: {
        data: data,
      },
      autoFit: true,
      shape: 'fill',
      color: {
        field: 'color',
        // value: ['blue', 'blue'],
      },
    });

    this.scene && this.choroplethLayer.addTo(this.scene);
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    this.scene && this.scene.destroy();
  }

  render() {
    return (
      <div
        id="container"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <div style={{ position: 'absolute', left: '10px', zIndex: 1 }}></div>
      </div>
    );
  }
}

export default XiHu;
