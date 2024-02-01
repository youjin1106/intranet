import {
  useEffect,
  useState,
} from 'react';

import Pagination from '@mui/material/Pagination';

type NoticeModel = {
  id: string;
  title: string;
  content: string;
  date: string;
};
const Notice = () => {
  const [noticeLists, setNoticeLists] = useState<NoticeModel[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/notice", { method: "GET" }) //메소드 방식 지정
      .then((res) => res.json()) //json으로 받을 것을 명시
      .then((data) => {
        //실제 데이터를 상태변수에 업데이트
        setNoticeLists(data);
      });
  }, []);
  return (
    <div className="flex flex-col bg-bg00 flex-1 p-[24px]">
      <div className=" bg-bg01 p-[16px] text-titleLg rounded mb-[12px]">
        공지사항
      </div>
      <div className="flex-1 flex flex-col justify-between bg-bg01 p-[16px] rounded">
        <div>
          <div className="border-solid border-y border-border order-indigo-600 flex justify-between px-[12px] py-[8px]">
            <span className="text-mdBold">제목</span>
            <span className="text-mdBold">등록일</span>
          </div>

          {noticeLists.map((it) => (
            <div
              key={it.id}
              className="border-b border-border border-solid px-3 py-3 flex justify-between"
            >
              <span className="text-mdBold">{it.title}</span>
              <span className="text-gray01 ">{it.date}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Pagination count={3} color="primary" />
        </div>
      </div>
    </div>
  );
};
export default Notice;
