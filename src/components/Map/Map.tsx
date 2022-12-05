import React, {useMemo} from 'react';
import {MapContainer, Polyline, TileLayer, CircleMarker, Tooltip, Popup} from "react-leaflet";
import {observer} from "mobx-react-lite";
import './Map.css'
import {routeStore} from "../../store/";

const Map = () => {
    const routeColor = { color: 'purple' }
    const markerColor = { color: '#ad6517', width: 1, fillOpacity: 1, fillColor: '#fdf321'}
    console.log('render map')

    return (
        <div className={'map'}>
            <MapContainer
                center={[57.63, 39.88]}
                zoom={13}
                scrollWheelZoom={true}>
                <TileLayer  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Polyline
                    pathOptions={routeColor}
                    positions={routeStore.busRoute} />
                {
                    routeStore.stations && !routeStore.isLoading && routeStore.stations.map((item) =>
                        <CircleMarker
                            key={item[0]} center={[item[1], item[2]]}
                            pathOptions={markerColor}
                            radius={5}
                            eventHandlers={{
                                click: () => {
                                    void routeStore.fetchStationInfo(item[0])
                                },
                            }}>
                            <Popup>{routeStore.stationInfo}</Popup>
                            <Tooltip >Остановка номер {item[0]}</Tooltip>
                        </CircleMarker>
                    )
                }
            </MapContainer>
        </div>
    );
};

export default observer(Map);