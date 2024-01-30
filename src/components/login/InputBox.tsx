type PlaceholderProps = {
  label:string
}

export default function InputBox({label}: PlaceholderProps) {
   return (
      <div>
         <input 
            type="text" 
            placeholder={label}
            className="w-full rounded-button py-[10px] px-[16px] outline-none border border-solid border-gray01" 
          />
      </div>
   );
}
