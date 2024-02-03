import {
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import Pagination from '@mui/material/Pagination';

import Header from '../components/header/Header';
import { NoticeTitle } from '../components/notice/Title';

type NoticeModel = {
  id: string;
  title: string;
  content: string;
  date: string;
};
const Notice = () => {
  const [noticeLists, setNoticeLists] = useState<NoticeModel[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3001/notice", { method: "GET" }) //메소드 방식 지정
      .then((res) => res.json()) //json으로 받을 것을 명시
      .then((data) => {
        //실제 데이터를 상태변수에 업데이트
        setNoticeLists(data);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const count = Math.ceil(noticeLists.length / itemsPerPage);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  const getPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return noticeLists.slice(startIndex, endIndex);
  };
  return (
    <div className="flex flex-col bg-bg00 flex-1 p-[24px]">
      <Header label="공지사항" />
      <div className="flex-1 flex flex-col justify-between bg-bg01 p-[16px] rounded">
        <div>
          <div className="border-solid border-y border-border order-indigo-600 flex justify-between px-[12px] py-[8px]">
            <span className="text-mdBold">제목</span>
            <span className="text-mdBold">등록일</span>
          </div>

          {getPageData().map((it) => (
            <div className="cursor-pointer">
              <NoticeTitle
                onClick={() => {
                  navigate(`/notice/${it.id}`);
                }}
                title={it.title}
                date={it.date}
                key={it.id}
              />{" "}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Pagination
            count={count}
            color="primary"
            page={currentPage}
            onChange={handleChange}
            sx={{ color: "#1C92FF" }}
          />
        </div>
      </div>
    </div>
  );
};
export default Notice;
