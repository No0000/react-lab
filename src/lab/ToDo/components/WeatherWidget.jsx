import { useState, useEffect } from "react";

export default function WeatherWidget() {
  const apikey = import.meta.env.VITE_WEATHER_API_KEY;
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => { // ブラウザの位置情報取得
      const { latitude, longitude } = position.coords; // 緯度、経度
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric&lang=ja`;

      // dataの中にはオブジェクトとして天気や場所に関する情報が入っている
      fetch(url).then(res => res.json()).then(data => {
        setWeather(data);
        setLoading(false); // 天気情報を取得する前に描画がされてしまうため、weatherはnullのままでエラーが出る。取得が終わったらfalseにして表示させるようにする。
      });
/*       if (!response.ok) {
        setError("取得できませんでした");
        return;
      } */
    })
  }, []);

  if (loading) {
    return (
      <div>
        <p>天気情報を取得中...</p>
      </div>
    );
  }

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "2px", background: "rgba(255,255,255,0.05)", border: "1px solid #4a4a5a", padding: "6px 10px" }}>
      <span style={{ fontSize: "11px", color: "#9a9aaa" }}>{weather.weather[0].description}</span>
      <img style={{width: "40px"}} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
      <span style={{ fontSize: "15px", fontWeight: 500, color: "#e8e0cc" }}>{Math.round(weather.main.temp)}°C</span>
    </div>
  );
}