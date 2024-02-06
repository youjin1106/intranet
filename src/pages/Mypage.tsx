import Header from '../components/header/Header';
import SelectTest from '../components/inputs/SelectTest';
import DayoffManager from '../components/mypage/dayoff/DayoffManager';
import { Members } from '../components/mypage/members/Members';
import NoticeSlide from '../components/mypage/notice-slide/NoticeSlide';
import Profile from '../components/mypage/profile/Profile';
import Timeline from '../components/mypage/schedule/Timeline';
import TodoList from '../components/mypage/todolist/TodoList';

const Mypage = () => {
  return (
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
          x
          <div className="">
            <Members />
          </div>
        </div>
        <div className="right-contents-area">
          <div className="layout schedule">
            <Timeline />
          </div>
          <div className="right-bottom-area">
            <div className="layout todo-list">
              할 일 목록
              <TodoList />
              <SelectTest />
            </div>
            <div className="dayoff-areas">
              <div className="layout dayoff-management">
                <DayoffManager />
              </div>
              <div className="layout dayoff-approval">연차 신청 내역</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Mypage;
