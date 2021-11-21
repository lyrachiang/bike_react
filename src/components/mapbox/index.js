// package
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import classNames from 'classnames/bind';
import { blueIcon, redIcon } from './leaflet-color-markers';

// components
import Tag from '../../components/tag';
import Box from '../../components/box';
import {
  MapMarkerAltIcon,
} from '../icons'

// style
import 'leaflet/dist/leaflet.css';
import styles from './leaflet_custom.scss';

const cx = classNames.bind(styles);

const MapBox = (props) => {
  const { type, metroInfo={}, position, dataSource } = props;
  const { StationName, StationAddress } = metroInfo;

  return (
    <MapContainer
      center={position}
      zoom={16}
      scrollWheelZoom={false}
      className={cx('mapbox_container')}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={blueIcon}>
        {type === 'current' && (
          <Popup>
            <div className={cx('info_block')}>
              <h4>我在這裡</h4>
            </div>
          </Popup>
        )}
        {type === 'metro' && (
          <Popup>
            <div className={cx('info_block')}>
              <h4>{StationName.Zh_tw}</h4>
              <div className={cx('info_box')}>
                <Box
                  type="info"
                  icon={<MapMarkerAltIcon />}
                  title="車站地址："
                  content={StationAddress}
                />
              </div>
            </div>
          </Popup>
        )}
      </Marker>
      {dataSource.map((data) => {
        const {
          id,
          name,
          address,
          total,
          lat: bikeLat,
          lon: bikeLon,
          status,
          type,
          rentCnt,
          returnCnt,
        } = data;

        const serviceStatus = [
          { type: 'stop', label: '停止營運' },
          { type: 'normal', label: '正常營運' },
          { type: 'pause', label: '暫停營運' },
        ];
        const serviceType = [
          { type: '1', label: 'YouBike1.0' },
          { type: '2', label: 'YouBike2.0' },
        ];

        return (
          <React.Fragment key={id}>
            <Marker position={[bikeLat, bikeLon]} icon={redIcon}>
              <Popup>
                <div className={cx('info_block')}>
                  <h4>{name.Zh_tw}</h4>
                  <div className={cx('tag_container')}>
                    <div>
                      <div className={cx('gap')}>
                        <Tag
                          type={serviceStatus[status] && serviceStatus[status].type}
                          theme="status"
                        >
                          {serviceStatus[status] && serviceStatus[status].label}
                        </Tag>
                      </div>
                    </div>
                    <div>
                      <div className={cx('gap')}>
                        <Tag theme="service">
                          {serviceType[type-1] && serviceType[type-1].label}
                        </Tag>
                      </div>
                    </div>
                  </div>
                  <div className={cx('info_box')}>
                    <Box
                      type="info"
                      title="站點地址："
                      content={address.Zh_tw}
                    />
                    <Box
                      type="info"
                      title="自行車總數："
                      content={total}
                    />
                    <Box
                      type="info"
                      title="可租借車數："
                      content={rentCnt}
                    />
                    <Box
                      type="info"
                      title="可歸還車數："
                      content={returnCnt}
                    />
                  </div>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
};

export default MapBox;