import Header from "../components/header/Header";
import Modal from "../components/modal/Modal";
import DayoffManager from "../components/mypage/dayoff/DayoffManager";
import DayOffHistory from "../components/mypage/dayoffhistory/DayOffHistory";
import { Members } from "../components/mypage/members/Members";
import NoticeSlide from "../components/mypage/notice-slide/NoticeSlide";
import Profile from "../components/mypage/profile/Profile";
import Timeline from "../components/mypage/schedule/Timeline";
import TodoList from "../components/mypage/todolist/TodoList";

const Mypage = () => {
  return (
    <>
      <Modal />
      <div className="h-full p-[24px] flex flex-col gap-[10px] flex-1 bg-bg00">
        <Header label={"마이페이지"} />
        <NoticeSlide />
        <div className="flex gap-[10px]">
          <div>
            <Profile />
            <Members />
          </div>
          <div className="w-full flex flex-col gap-[10px]">
            <Timeline />
            <div className="flex gap-[10px]">
              <TodoList />
              <div className="flex flex-col grow gap-[10px]">
                <DayoffManager />
                <DayOffHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Mypage;
