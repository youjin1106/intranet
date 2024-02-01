type PlaceholderProps = {
   type: string;
   label: string;
};

export default function InputBox({ label, type }: PlaceholderProps) {
   return (
      <div>
         <input
            type={type}
            placeholder={label}
            className="w-full h-[40px] rounded-button py-[10px] px-[16px] outline-none border border-solid border-gray01"
         />
      </div>
   );
}
