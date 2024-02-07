import { useEffect, useState } from "react";

import { useAtom } from "jotai";

import { isLoggedInAtom } from "../../../App";
import SelectBox from "../../inputs/SelectBox";
import { ProfileImage } from "../../profileImage/ProfileImage";

type User = {
	id: string;
	name: string;
	password: string;
	email: string;
	state: string;
	image: string;
	position: string;
	dayoff: string;
};

export default function Profile() {
	const [isLoggedIn] = useAtom(isLoggedInAtom);
	const [user, setUser] = useState<User | null>(null);
	const [status, setStatus] = useState(true);
	const [uploadedImage, setUploadedImage] = useState<string | null>(null);

	useEffect(() => {
		const loggedInUserEmail = sessionStorage.getItem("loggedInUserEmail");

		if (loggedInUserEmail) {
			const userData = async () => {
				await fetch("http://localhost:3001/user", {
					headers: {
						Accept: "application/json",
					},
				})
					.then(res => res.json())
					.then((data: User[]) =>
						data.map(user => {
							if (user.email === loggedInUserEmail) {
								setUser(user || null);
							}
						}),
					)
					.catch(err => {
						console.error(`Error : ${err}`);
					});
			};

			if (isLoggedIn) {
				userData();
			}
		}
	}, [isLoggedIn]);

	const handleSelected = () => {
		setStatus(!status);
	};

	const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setUploadedImage(imageUrl);
		}
	};

	return (
		<div className="w-[400px] h-[316px] p-[16px] flex flex-col justify-around bg-bg01 rounded">
			<div className="flex justify-between mb-[16px]">
				<h2 className="text-titleMd text-gray00 font-bold ">프로필</h2>
				<div className="flex items-center gap-[4px]">
					<p className="text-gray00">상태:</p>
					<SelectBox options={["근무중", "자리비움"]} size="md" selectedValue="근무중" onSelect={handleSelected} />
				</div>
			</div>
			<div className="flex flex-col items-center gap-[5px]" onChange={onChangeImage}>
				{uploadedImage ? (
					<ProfileImage size="lg" isOnline={status} src={uploadedImage} />
				) : (
					<ProfileImage size="lg" isOnline={status} src={user?.image} />
				)}
				<label htmlFor="file-image" className="flex justify-center cursor-pointer">
					<span className="material-symbols-outlined">add</span>
					이미지업로드
				</label>
				<input type="file" id="file-image" className="hidden" />
			</div>
			<div className="flex flex-col items-center gap-[4px]">
				<p className="text-gray01">{user?.position}</p>
				<p className="text-gray00 text-titleMd">{user?.name}</p>
				<p className="text-gray01 text-lg">{user?.email}</p>
			</div>
		</div>
	);
}
