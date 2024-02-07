import React from "react";
interface ToggleProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const Toggle: React.FC<ToggleProps> = ({ onChange }) => {
  return (
    <input
      type="checkbox"
      className="z-10 appearance-none w-9 h-5 rounded-[1.25em] border-2 border-bg00 bg-bg00 before:absolute before:w-4 before:h-4 before:bg-gray01 before:rounded  before:duration-200 checked:before:bg-primary checked:before:translate-x-[1em] mt-4 ml-2 mr-2"
      onChange={onChange}
    />
  );
};
export default Toggle;
