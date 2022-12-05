import React from 'react';

import './App.css';
import BusList from "../components/BusList/BusList";
import Map from '../components/Map/Map'
import {observer} from "mobx-react-lite";

function App() {
    return (
        <div className={'mainPage'}>
            <BusList />
            <Map />
        </div>
    )
}

export default observer(App);
