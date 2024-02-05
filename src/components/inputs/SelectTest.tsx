import SelectBox from "./SelectBox";

// 셀렉트테스트 컴포넌트
const SelectTest = () => {
  // 순서 선택 함수
  const orderSelect = (order: string) => {
    console.log(`${order}`);
  };

  // 유저 콜백 함수
  const userSelect = (user: string) => {
    console.log(`${user}`);
  };

  return (
    <div>
      <SelectBox
        options={["First", "Second", "Third"]}
        size={"lg"}
        selectedValue={"First"}
        onSelect={orderSelect}
      />

      <SelectBox
        options={["짱구", "유리", "훈발놈"]}
        size={"md"}
        selectedValue={"짱구"}
        onSelect={userSelect}
      />
    </div>
  );
};

export default SelectTest;
