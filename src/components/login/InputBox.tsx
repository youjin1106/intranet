type PlaceholderProps = {
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputBox({ label, onChange }: PlaceholderProps) {
  return (
    <div>
      <input
        type="text"
        placeholder={label}
        className="w-full h-[40px] rounded-button py-[10px] px-[16px] outline-none border border-solid border-gray01"
        onChange={onChange}
      />
    </div>
  );
}
