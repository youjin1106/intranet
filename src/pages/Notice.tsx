const Notice = () => {
  fetch("http://localhost:3001/user", { method: "GET" }) //메소드 방식 지정
    .then((res) => res.json()) //json으로 받을 것을 명시
    .then((res) => {
      //실제 데이터를 상태변수에 업데이트
      console.log(1, res);
    });

  return (
    <div className="bg-bg00 flex-1 p-[24px]">
      <div className="bg-bg01 p-[16px] text-titleLg rounded mb-[12px]">
        공지사항
      </div>
      <div className="bg-bg01 p-[16px] rounded">
        <div className="border order-indigo-600 flex justify-between px-[12px] py-[8px]">
          <span className="text-mdBold">제목</span>
          <span className="text-mdBold">등록일</span>
        </div>
      </div>
    </div>
  );
};
export default Notice;
