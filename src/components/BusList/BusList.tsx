import React from 'react';
import {IBusListOptions} from "./BusList.types";
import BusItem from "../BusItem/BusItem";
import './BusList.css'
import {routeStore} from "../../store";

const BusList = () => {
    return (
        <div className={'routeList'}>
            <span className={'routeList__title'}>Список маршрутов</span>
            {
                routeStore.routeList.map((item: IBusListOptions) =>
                    <BusItem key={item.id} busRoute={item} />
                )
            }
        </div>
    );
};

export default BusList;