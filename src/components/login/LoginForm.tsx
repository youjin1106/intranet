import { useState } from "react";
import logo from "../../assets/logo.svg";
import InputBox from "./InputBox";
import PrimaryButton from "../buttons/PrimaryButton";

interface LoginFormProps {
	onLogin: (email: string, password: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onLogin(formData.email, formData.password);
	};

	const onChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<form
			className="w-[484px] h-[432px] bg-white p-10 rounded flex flex-col justify-around gap-[64px]"
			onSubmit={handleSubmit}>
			<h1 className="logo">
				<img src={logo} alt="logo" />
			</h1>
			<div className="flex flex-col gap-[16px]">
				<InputBox
					type="text"
					placeholder="이메일주소"
					name="email"
					value={formData.email}
					onChange={onChangeFormData}
				/>
				<InputBox
					type="password"
					placeholder="비밀번호"
					name="password"
					value={formData.password}
					onChange={onChangeFormData}
				/>
			</div>
			<PrimaryButton label="Login" size="lg" />
		</form>
	);
}
