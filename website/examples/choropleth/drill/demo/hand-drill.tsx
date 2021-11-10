import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Choropleth } from '@antv/l7plot';

function AdministrativeDrill() {
  const administrativeList = useRef([]);
  const [administrativeTree, setAdministrativeTree] = useState([]);
  const map = useRef<Choropleth>();

  const getRandomNumber = (min = 10, max = 2000) => {
    return Math.random() * (max - min) + min;
  };

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/alisis/geo-data-v0.1.0/administrative-data/area-tree.json')
      .then((response) => response.json())
      .then((data) => {
        setAdministrativeTree(data);
      });
  }, []);

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/alisis/geo-data-v0.1.0/administrative-data/area-list.json')
      .then((response) => response.json())
      .then((list) => {
        administrativeList.current = list;
        const data = list
          .filter(({ level }) => level === 'province')
          .map((item) => Object.assign({}, item, { value: getRandomNumber() }));

        const chinaMap = new Choropleth('mapContainer', {
          map: {
            type: 'amap',
            style: 'blank',
            center: [120.19382669582967, 30.258134],
            zoom: 3,
            pitch: 0,
          },
          source: {
            data: data,
            joinBy: {
              sourceField: 'adcode',
              geoField: 'adcode',
            },
          },
          viewLevel: {
            level: 'country',
            adcode: '100000',
          },
          autoFit: true,
          color: {
            field: 'value',
            value: ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'],
            scale: { type: 'quantize' },
          },
          style: {
            fill: '#000',
            opacity: 0.8,
            fontSize: 10,
            stroke: '#fff',
            strokeWidth: 1.5,
            textAllowOverlap: false,
            padding: [5, 5],
          },
          label: {
            visible: true,
            field: 'name',
            style: {
              fill: '#000',
              opacity: 0.8,
              fontSize: 10,
              stroke: '#fff',
              strokeWidth: 1.5,
              textAllowOverlap: false,
              padding: [5, 5],
            },
          },
          state: {
            active: { stroke: 'black', lineWidth: 1 },
          },
          tooltip: {
            items: ['name', 'adcode', 'value'],
          },
          zoom: {
            position: 'bottomright',
          },
          legend: {
            position: 'bottomleft',
          },
        });

        map.current = chinaMap;
      });

    return () => map.current?.destroy();
  }, []);

  return (
    <>
      <div
        id="mapContainer"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    </>
  );
}

ReactDOM.render(<AdministrativeDrill />, document.getElementById('container'));
