// package
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';

// components
import Container, { MainFilter, MapResult } from '../../components/container';
import Button from  '../../components/button';
import Select from  '../../components/select';
import {
  LocationIcon,
  LocationGreenIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from '../../components/icons';
import MapBox from '../../components/mapbox';

//slice
import {
  getMetroState,
  fetchMetroLine,
  fetchMetroStationByLine,
  fetchMetroStation,
  setMetroLineList,
  setMetroStationList,
} from '../../store/slice/metro';
import {
  getBikeState,
  fetchBikeStation,
  fetchBikeStationInfo,
  setBikeStationList,
  setBikeStationInfoList,
} from '../../store/slice/bike';

// style
import styles from './station.module.scss';

const cx = classNames.bind(styles);

const Station = () => {
  const dispatch = useDispatch();
  const { metroLineList, metroStationList, metroStationInfo } = useSelector(getMetroState);
  const { isBikeStationLoading, isBikeStationInfoLoading, bikeStationList, bikeStationInfoList } = useSelector(getBikeState);

  const [selectLine, setSelectLine] = useState('');
  const [selectStation, setSelectStation] = useState('');
  const [type, setType] = useState('');
  const [position, setPosition] = useState([]);
  const [search, setSearch] = useState(false);
  const [showBlock, setShowBlock] = useState(false);

  useEffect(() => {
    dispatch(fetchMetroLine({
      fields: 'LineID,LineName',
    }));

    return () => {
      dispatch(setMetroLineList([]));
    }
  }, [dispatch]);

  useEffect(() => {
    if (selectLine) {
      dispatch(fetchMetroStationByLine({
        id: selectLine,
        fields: 'Stations',
      }));
    }

    return () => {
      dispatch(setMetroStationList([]));
    }
  }, [dispatch, selectLine]);

  useEffect(() => {
    if (position.length) {
      dispatch(fetchBikeStation({
        position: {
          lat: position[0],
          lon: position[1],
        },
        fields: 'StationID,StationName,StationAddress,BikesCapacity,StationPosition,ServiceType',
      }))
        .then(() => {
          dispatch(fetchBikeStationInfo({
            position: {
              lat: position[0],
              lon: position[1],
            },
            fields: 'StationID,ServiceStatus,ServiceType,AvailableRentBikes,AvailableReturnBikes',
          }))
        });
    }

    return () => {
      dispatch(setBikeStationList([]));
      dispatch(setBikeStationInfoList([]));
    }
  }, [dispatch, position]);

  useEffect(() => {
    if (metroStationInfo.StationPosition) {
      setPosition(() => [metroStationInfo.StationPosition.PositionLat, metroStationInfo.StationPosition.PositionLon]);
    }
  }, [metroStationInfo]);

  useEffect(() => {
    if (!isBikeStationLoading && !isBikeStationInfoLoading) {
      setSearch(() => false);
    }
  }, [isBikeStationLoading, isBikeStationInfoLoading]);

  const metroLine = useMemo(() => {
    let lines = [];
  
    metroLineList.map((metroLine) => {
      return lines.push({
        label: metroLine.LineName.Zh_tw,
        value: metroLine.LineID,
      });
    });

    return lines;
  }, [metroLineList]);

  const metroStation = useMemo(() => {
    let stations = [];
  
    metroStationList.map((metroStation) => {
      return metroStation.Stations.map((station) => {
        return stations.push({
          label: station.StationName.Zh_tw,
          value: station.StationID,
        });
      });
    });

    return stations;
  }, [metroStationList]);

  const bikeStationData = useMemo(() => {
    let stations = [];
  
    if (bikeStationList.length > 0 && bikeStationInfoList.length > 0) {
      bikeStationList.forEach((bikeStation) => {
        const { StationID, StationName, StationPosition, BikesCapacity, StationAddress } = bikeStation;
  
        bikeStationInfoList.forEach((bikeStationInfo) => {
          if (StationID === bikeStationInfo.StationID) {
            const stationInfo = {
              id: StationID,
              name: StationName,
              address: StationAddress,
              lat: StationPosition.PositionLat,
              lon: StationPosition.PositionLon,
              total: BikesCapacity,
              status: bikeStationInfo.ServiceStatus,
              type: bikeStationInfo.ServiceType,
              rentCnt: bikeStationInfo.AvailableRentBikes,
              returnCnt: bikeStationInfo.AvailableReturnBikes,
            };

            stations.push(stationInfo);
          }
        });
      });
    }

    return stations;
  }, [bikeStationList, bikeStationInfoList]);

  const atClickCurrent = useCallback(() => {
    setType(() => 'current');
    setSelectLine(() => '');
    setSelectStation(() => '');
    setSearch(() => true);
    setShowBlock(() => false);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition(() => [position.coords.latitude, position.coords.longitude]);
      },
      (err) => {
        alert("你不想讓我知道你在哪裡嗎QQ\n快去按一下允許啦");
      },
    )
  }, []);

  const atClickSearch = useCallback((line, station) => {
    setType(() => 'metro');
    setSearch(() => true);
    setShowBlock(() => false);

    dispatch(fetchMetroStation({
      id: station,
      fields: 'StationID,StationName,StationAddress,StationPosition',
    }));
  }, [dispatch]);
  
  const atClickExpand = useCallback(() => {
    setShowBlock(() => true);
  }, []);

  const atClickCollapse = useCallback(() => {
    setShowBlock(() => false);
  }, []);

  return (
    <Container className={cx('station_container')}>
      <MainFilter className={cx('filter_container', { active: showBlock})}>
        <div>
          <div className={cx('filter_title')}>
            <h2>去哪找YouBike？</h2>
            <div>
              {!showBlock ? (
                <Button
                  type="secondary"
                  theme="search"
                  size="small"
                  icon={<ArrowDownIcon />}
                  shape="circle"
                  iconRight
                  onClick={atClickExpand}
                >
                  開始搜尋
                </Button>
              ) : (
                <Button
                  type="secondary"
                  theme="result"
                  size="small"
                  icon={<ArrowUpIcon />}
                  shape="circle"
                  iconRight
                  onClick={atClickCollapse}
                >
                  查看結果
                </Button>
              )}
            </div>
          </div>
          <div className={cx('filter_block')}>
            <div>
              <Button
                type="info"
                size="large"
                icon={<LocationIcon />}
                shape="circle"
                block
                onClick={atClickCurrent}
              >
                我附近的YouBike站點
              </Button>
            </div>
            <div className={cx('filter_box')}>
              <div>
                <Select
                  name="line"
                  icon={<LocationGreenIcon />}
                  placeholder="捷運路線"
                  options={metroLine}
                  onChange={(id) => {
                    setSelectLine(() => id);
                    setSelectStation(() => '');
                  }}
                />
              </div>
              {selectLine !== '' && metroStation.length > 0 && (
                <div>
                  <Select
                    name="station"
                    icon={<LocationGreenIcon />}
                    placeholder="捷運站"
                    options={metroStation}
                    onChange={(id) => {
                      setSelectStation(() => id);
                    }}
                  />
                </div>
              )}
              {selectStation !== '' && (
                <div className={cx('btn_container')}>
                  <Button
                    type="primary"
                    icon={<LocationIcon />}
                    shape="circle"
                    onClick={() => atClickSearch(selectLine, selectStation)}
                  >
                    YouBike在哪？
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </MainFilter>
      <MapResult>
        {search ? (
          <div className={cx('result_loading_img')}></div>
        ) : (
          position.length > 0 && bikeStationData.length > 0 ? (
            <MapBox
              type={type}
              metroInfo={metroStationInfo}
              position={position}
              dataSource={bikeStationData}
            />
          ) : (
            <div className={cx('result_default_img')}></div>
          )
        )}
      </MapResult>
    </Container>
  );
};

export default Station;