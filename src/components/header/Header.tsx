import 'dayjs/locale/ko';

import {
  useEffect,
  useState,
} from 'react';

import dayjs from 'dayjs';
import Geocode from 'react-geocode';

dayjs.locale("ko");

type TitleProps = {
  label: string;
};

export default function Header({ label }: TitleProps) {
  const [clock, setClock] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const Timer = setInterval(() => {
      const now = dayjs();
      setClock(`${now.format("A HH:mm:ss")}`);
      setDate(`${now.format("YYYY년 MM월 DD일 ddd요일")}`);
    }, 1000);

    return () => {
      clearInterval(Timer);
    };
  }, []);
  //내위치 불러오기
  const [currentLocation, setCurrentLocation] = useState(null);
  useEffect(() => {
    // 사용자의 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // 리버스 지오코딩을 사용하여 좌표에서 주소 가져오기
          try {
            const response = await Geocode.fromLatLng(latitude, longitude);
            const address = response.results[0].formatted_address;
            // 여기서 address에서 동 정보를 추출하거나 필요한 부분을 처리할 수 있습니다.
            console.log(address);
            setCurrentLocation(address);
          } catch (error) {
            console.error("Error fetching address:", error);
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
    <header className="p-[16px] flex justify-between items-center">
      <h1 className="text-titleLg font-bold text-gray00">{label}</h1>

      <div className="flex flex-col items-end">
        <p className="text-lg font-medium">{clock}</p>
        <span className="text-s text-gray01">{date}</span>
        <span>{currentLocation}</span>
      </div>
    </header>
  );
}
