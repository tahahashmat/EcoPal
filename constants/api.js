const server = {
    base: 'http://192.168.129.177:8000/',

    // LIGHTS //
    turnOnLight: (room, status) => `setLight/${room}/${status}/`,
    getLight: (room) => `getLight/${room}/`,
    getLightHistory: (room) => `getLights/${room}/`,

    // THERMOSTAT //
    setTemp: (temp) => `setTemp/${temp}/`,
    getTemp: (timestamp) => `getLight/${timestamp}/`, //timestamp format: 'YYYY-MM-DDThh:mm:ssZ'
    getTempHistory: 'getTemps/',
}

export default server;