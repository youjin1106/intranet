import {
  useEffect,
  useState,
} from 'react';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import GrayButton from '../components/buttons/GrayButton';
import Header from '../components/header/Header';
import { NoticeTitle } from '../components/notice/Title';

type NoticeModel = {
  id: string;
  title: string;
  content: string;
  date: string;
};

export const NoticeDetail = () => {
  const navigate = useNavigate();
  const { noticeId } = useParams();
  const [notice, setNotice] = useState<NoticeModel | undefined>();
  useEffect(() => {
    fetch(`http://localhost:3001/notice/${noticeId}`, { method: "GET" }) //메소드 방식 지정
      .then((res) => res.json()) //json으로 받을 것을 명시
      .then((data) => {
        //실제 데이터를 상태변수에 업데이트
        setNotice(data);
      });
  }, [noticeId]);
  if (!notice) return null;
  return (
    <div className="h-lvh flex flex-col gap-[10px] bg-bg00 flex-1 p-[24px]">
      <Header label="공지사항" />
      <div className="flex-1 flex flex-col justify-between bg-bg01 p-[16px] rounded">
        <div>
          <div className="h-[1px] bg-border"></div>
          <NoticeTitle title={notice.title} date={notice.date} />
          <div className="whitespace-break-spaces py-4 px-3 text-gray00">
            {notice.content}
          </div>
        </div>
        <div className="flex justify-center">
          <GrayButton
            label={"목록으로"}
            onClick={() => {
              navigate("/notice");
            }}
          />
        </div>
      </div>
    </div>
  );
};
