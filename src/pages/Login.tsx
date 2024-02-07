import LoginForm from "../components/login/LoginForm";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { isLoggedInAtom } from "../App";

type User = {
	email: string;
	password: string;
};

export default function Login() {
	const [ , setIsLoggedIn] = useAtom(isLoggedInAtom);
	const navigate = useNavigate();

	const handleLogin = async (email: string, password: string) => {
		await fetch("http://localhost:3001/user", {
			headers: {
				Accept: "application/json",
			},
		})
			.then(res => res.json())
			.then((data: User[]) =>
				data.map(user => {
					if (user.email === email && user.password === password) {
						sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
						sessionStorage.setItem("loggedInUserEmail", user.email);
						setIsLoggedIn(true);
						navigate("/");
					}
				}),
			)
			.catch(err => {
				console.error(`Error : ${err}`);
			});
	};

	return (
		<div className="w-screen h-screen bg-primary flex justify-center items-center">
			<LoginForm onLogin={handleLogin} />
		</div>
	);
}
