import { NoticeTitle } from '../components/notice/Title';

export const NoticeDetail = () => {
  return (
    <div className="flex flex-col bg-bg00 flex-1 p-[24px]">
      <div className=" bg-bg01 p-[16px] text-titleLg rounded mb-[12px]">
        공지사항
      </div>
      <div className="flex-1 flex flex-col justify-between bg-bg01 p-[16px] rounded">
        <div>
          <div className="border-solid border-y border-border order-indigo-600 flex justify-between px-[12px] py-[8px]">
            <NoticeTitle title={"ㄹㅎ"} date={"2024-01-01"} />
          </div>
        </div>
      </div>
    </div>
  );
};
