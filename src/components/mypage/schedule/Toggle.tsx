const Toggle = ({ onChange }) => {
  return (
    <input
      type="checkbox"
      className="appearance-none w-9 h-5 rounded-[1.25em] border-2 border-bg00 bg-bg00 before:absolute before:w-4 before:h-4 before:bg-gray01 before:rounded  before:duration-200 checked:before:bg-primary checked:before:translate-x-[1em]"
      onChange={onChange}
    />
  );
};
export default Toggle;
