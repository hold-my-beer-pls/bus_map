import React from 'react';
import {observer} from "mobx-react-lite";
import {routeStore} from "../../store";
import './BusItem.css'

const BusItem = ({busRoute}: any) => {
    console.log('render bus')
    const handleCheckboxChange = () => {
        console.log('render')
        void routeStore.select(busRoute.id)
    }

    return (
        <div>
            <div
                className={routeStore.selected === busRoute.id ? 'bus bus__selected': 'bus'}
                onClick={handleCheckboxChange}>
                автобус N {busRoute.text}
            </div>
        </div>
    );
};

export default observer(BusItem);