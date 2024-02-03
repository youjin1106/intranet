type PlaceholderProps = {
	type: string;
	placeholder: string;
	name?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputBox({ placeholder, type, name, value, onChange }: PlaceholderProps) {
	return (
		<div>
			<input
				type={type}
				placeholder={placeholder}
				className="w-full h-[40px] rounded-button py-[10px] px-[16px] outline-none border border-solid border-gray01"
				name={name}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}
