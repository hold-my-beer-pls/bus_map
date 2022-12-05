import {makeAutoObservable, runInAction} from 'mobx'
import {IBusListOptions} from "../components/BusList/BusList.types";
import {getRoute, getStationInfo, getStations} from "../service/bus";

export class RouteStore {
    private _busRoute: [number, number][] = []
    private _stations: [string, number, number][] = []
    private _selected: string = ''
    private _isLoading: boolean = false
    private _error: string | null = null
    private _stationInfo: any = ''
    private _routeList: IBusListOptions[] = [
        {
            text: '1',
            id: '1',
            description: ['start', 'finish']
        },
        {
            text: '2',
            id: '2',
            description: ['start', 'finish']
        },
        {
            text: '4',
            id: '4',
            description: ['start', 'finish']
        },
        {
            text: '30',
            id: '30',
            description: ['start', 'finish']
        },
        {
            text: '55',
            id: '55',
            description: ['start', 'finish']
        },
        {
            text: '68',
            id: '68',
            description: ['start', 'finish']
        },
        {
            text: '93Г',
            id: '93g',
            description: ['start', 'finish']
        },
        {
            text: '99C',
            id: '99c',
            description: ['start', 'finish']
        },
    ]

    constructor() {
        makeAutoObservable(this)
    }

    async fetchBusRoute(id: string) {
        runInAction(() => {
            this._isLoading = true
        })

        try {
            const response = await getRoute(id)
            runInAction(() => {
                this._busRoute = response.map((item: string[]) => {
                    return [Number(item[0]), Number(item[1])]
                })
            })
        } catch (e: any) {
            this.clear()
            this._error = e
        }
        runInAction(() => {
            this._isLoading = false
        })
    }

    async fetchStations(id: string) {
        runInAction(() => {
            this._isLoading = true
        })

        try {
            const response = await getStations(id)
            runInAction(() => {
                this._stations = response.map((item: string[]) => {
                    return [item[0], Number(item[1]), Number(item[2])]
                })
            })
        } catch (e: any) {
            this.clear()
            this._error = e
        }
        runInAction(() => {
            this._isLoading = false
        })
    }

    async fetchStationInfo(id: string) {

        try {
            const response = await getStationInfo(id)
            runInAction(() => {
                this._stationInfo = response
            })
        } catch (e: any) {
            this.clear()
            this._error = e
        }
    }

    get stationInfo() {
        return this._stationInfo
    }

    get routeList() {
        return this._routeList
    }

    get stations() {
        return this._stations
    }

    get busRoute() {
        return this._busRoute
    }

    get selected() {
        return this._selected
    }

    get isLoading() {
        return this._isLoading
    }

    async select(id: string) {
        if (this._selected !== id) {
            this._selected = id;
            await this.fetchBusRoute(id)
            await this.fetchStations(id)
        } else {
            this._selected = ''
            this.clear()
        }
    }

    clear(): void {
        this._busRoute = []
        this._error = null
        this._isLoading = false
        this._stations = []
        this._stationInfo = ''
    }
}