import axios from "axios";

const baseUrl = 'http://localhost:8010/proxy'
export const getRoute = async (busNumber: string): Promise<any> => {
    const response = await axios.get(`${baseUrl}/getroute.php?vt=1&r=${busNumber}`)
    return response.data
}

export const getStations = async (busNumber: string): Promise<any> => {
    const response = await axios.get(`${baseUrl}/getstations.php?vt=1&r=["${busNumber}"]`)
    return response.data
}

export const getStationInfo = async (stationId: string): Promise<any> => {
    const response = await axios.get(`${baseUrl}/getstationinfo.php?id=${stationId}`)
    return response.data
}