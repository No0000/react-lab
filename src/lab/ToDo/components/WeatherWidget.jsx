import { useState, useEffect } from "react";

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // APIキーが未設定の場合は早期リターン（本番環境でVercelに環境変数を追加する必要がある）
    const apikey = import.meta.env.VITE_WEATHER_API_KEY;
    if (!apikey) {
      setError("APIキー未設定");
      setLoading(false);
      return;
    }

    // 位置情報が使用できない環境への対応
    if (!navigator.geolocation) {
      setError("位置情報非対応");
      setLoading(false);
      return;
    }

    // ブラウザの位置情報取得
    navigator.geolocation.getCurrentPosition(
      // ① 成功コールバック
      (position) => {
        const { latitude, longitude } = position.coords; // 緯度、経度
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric&lang=ja`;

        // dataの中にはオブジェクトとして天気や場所に関する情報が入っている
        fetch(url)
          .then(res => {
            if (!res.ok) throw new Error(`API失敗: ${res.status}`);
            return res.json();
          })
          .then(data => {
            setWeather(data);
            setLoading(false);
          })
          .catch(() => {
            setError("天気情報を取得できませんでした");
            setLoading(false);
          });
      },
      // ② エラーコールバック（位置情報の取得失敗・拒否・タイムアウト時）
      (err) => {
        const messages = {
          1: "位置情報の許可が必要です", // PERMISSION_DENIED
          2: "位置情報を取得できませんでした", // POSITION_UNAVAILABLE
          3: "位置情報の取得がタイムアウトしました", // TIMEOUT
        };
        setError(messages[err.code] ?? "位置情報エラー");
        setLoading(false);
      },
      // ③ オプション
      { timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  if (loading) {
    return (
      <div>
        <p>天気情報を取得中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #4a4a5a", padding: "6px 10px" }}>
        <span style={{ fontSize: "11px", color: "#6a6a7a" }}>{error}</span>
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
