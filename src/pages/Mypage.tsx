import Timeline from "../components/mypage/schedule/Timeline";
import TodoList from "../components/mypage/todolist/TodoList";
import { ProfileImage } from "../components/profile/ProfileImage";

const Mypage = () => {
  return (
    <div className="layout">
      <div className="layout">페이지 제목</div>
      <div className="layout">미니 공지사항</div>
      <div className="layout contents-areas">
        <div className="layout left-contents-area">
          <div className="layout profile">프로필</div>
          <div className="layout members">
            멤버목록
            <ProfileImage size="lg" isOnline={true} />
            <ProfileImage />
          </div>
        </div>
        <div className="layout right-contents-area">
          <div className="layout schedule">
            <Timeline />
          </div>
          <div className="layout right-bottom-area">
            <div className="layout todo-list">
              할 일 목록
              <TodoList />
            </div>
            <div className="layout dayoff-areas">
              <div className="layout dayoff-management">연차 관리</div>
              <div className="layout dayoff-approval">연차 신청 내역</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Mypage;
