const getWeatherByCity = async (req, res) => {
    const API_KEY = process.env.API_KEY;
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: "City is required as a query parameter." });
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        console.log(response)
        if (!response.ok) {
            return res.status(response.status).json({ error: "Failed to fetch weather data." });
        }
        const data = await response.json();
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error." });
    }
};
const getWeatherByUserDeviceCoords=async (req,res)=>{
    const{lat,lon}=req.query;
    const API_KEY=process.env.API_KEY
    let api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    if(!lat || !lon) return res.status(400).json({ error: "Can't Access User Geolocation" });
    try {
        const response = await fetch(api);
        if (!response.ok) return res.status(response.status).json({ error: "Failed to fetch weather data." });
        const data = await response.json();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: "Internal server error." });
    }
}
module.exports = {
    getWeatherByCity,
    getWeatherByUserDeviceCoords
};
