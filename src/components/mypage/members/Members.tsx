import { useEffect, useState } from "react";

import SelectBox from "../../inputs/SelectBox";
import { ProfileImage } from "../../profileImage/ProfileImage";

type MembersModel = {
	id: string;
	name: string;
	password: string;
	email: string;
	state: string;
	image: string;
	position: string;
	dayoff: string;
};

export const Members = () => {
	const [users, setUsers] = useState<MembersModel[]>([]);
	const loggedInUserEmail = sessionStorage.getItem("loggedInUserEmail");
	useEffect(() => {
		fetch("http://localhost:3001/user", { method: "GET" }) //메소드 방식 지정
			.then(res => res.json()) //json으로 받을 것을 명시
			.then(data => {
				//실제 데이터를 상태변수에 업데이트
				const otherUsers = data.filter((user: MembersModel) => user.email !== loggedInUserEmail);
				setUsers(otherUsers);
			});
	}, []);

	const [isSelected, setIsSelected] = useState("전체");
	const handleChange = (option: string) => {
		fetch("http://localhost:3001/user", { method: "GET" }) //메소드 방식 지정
			.then(res => res.json()) //json으로 받을 것을 명시
			.then(data => {
				//실제 데이터를 상태변수에 업데이트

				const otherUsers = data.filter((user: MembersModel) => user.email !== loggedInUserEmail);
				if (option == "온라인") {
					const onlineUsers = otherUsers.filter((user: MembersModel) => user.state == "online");
					setUsers(onlineUsers);
				} else if (option == "오프라인") {
					const onlineUsers = otherUsers.filter((user: MembersModel) => user.state == "offline");
					setUsers(onlineUsers);
				} else {
					setUsers(otherUsers);
				}
			});

		setIsSelected(option);
		console.log(option);
	};
	return (
		<div className="rounded p-4 bg-bg01 w-[400px] mt-[12px]">
			<div className="flex items-center justify-between mb-6">
				<h2 className="font-bold text-titleMd text-gray00">멤버</h2>
				<div>
					<div className="flex items-center">
						<span className="mr-1">보기:</span>
						<SelectBox
							size="sm"
							options={["전체", "온라인", "오프라인"]}
							selectedValue={isSelected}
							onSelect={handleChange}
						/>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-3">
				{users.map(it => (
					<div key={it.id} className="flex gap-4">
						<ProfileImage
							isOnline={it.state === "online" && true}
							src={
								"https://hackspirit.com/wp-content/uploads/2021/06/Copy-of-Rustic-Female-Teen-Magazine-Cover.jpg"
							}
						/>
						<div>
							<p className="text-lg">{it.name}</p>
							<p className="text-md">{it.position}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
