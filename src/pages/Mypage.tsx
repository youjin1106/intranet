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
      <div className="container">
        <div className="layout header rounded">
          <Header label={"마이페이지"} />
        </div>
        <div className="notice-slide layout rounded">
          <NoticeSlide />
        </div>
        <div className="contents-areas">
          <div className="left-contents-area">
            <div className="layout profile">
              <Profile />
            </div>
            <div className="">
              <Members />
            </div>
          </div>
          <div className="right-contents-area">
            <div className="layout schedule w-[820px]">
              <Timeline />
            </div>
            <div className="right-bottom-area">
              <div className="layout todo-list">
                <TodoList />
              </div>
              <div className="dayoff-areas">
                <div className="layout dayoff-management w-[400px] bg-gray01">
                  <DayoffManager />
                </div>
                <div className="layout dayoff-approval"> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Mypage;
