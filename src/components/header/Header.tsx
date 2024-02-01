import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

type TitleProps = {
   label: string;
};

export default function Header({ label }: TitleProps) {
   const [clock, setClock] = useState('');
   const [date, setDate] = useState('');

   useEffect(() => {
      const Timer = setInterval(() => {
         const now = dayjs();
         setClock(`${now.format('A HH:mm:ss')}`);
         setDate(`${now.format('YYYY년 MM월 DD일 ddd요일')}`);
      }, 1000);

      return () => {
         clearInterval(Timer);
      };
   }, []);

   return (
      <header className="p-[16px] flex justify-between items-center">
         <h1 className="text-titleLg font-bold text-gray00">{label}</h1>
         <div className="flex flex-col items-end">
            <p className="text-lg font-medium">{clock}</p>
            <span className="text-s text-gray01">{date}</span>
         </div>
      </header>
   );
}
