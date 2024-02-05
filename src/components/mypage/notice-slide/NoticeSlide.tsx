import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

type Notice = {
	title: string;
};

export default function NoticeSlide() {
	const [notice, setNotice] = useState<string[]>([]);

	useEffect(() => {
		fetch("http://localhost:3001/header-notice", {
			headers: {
				Accept: "application/json",
			},
		})
			.then(res => res.json())
			.then((data: Notice[]) => {
				const titlesArray = data.map(item => item.title);
				setNotice(titlesArray);
			})
			.catch(err => {
				console.error(`Error : ${err}`);
			});
	}, []);

	return (
		<div className="h-[56px] p-[16px] flex gap-[8px] text-gray00">
			<span className="material-symbols-outlined">notifications_active</span>
			<Swiper
				className="overflow-hidden"
				direction={"vertical"}
				autoplay={{
					delay: 3500,
					disableOnInteraction: false,
				}}
				loop={true}
				modules={[Autoplay]}>
				{notice.map((item, index) => (
					<SwiperSlide key={index}>{item}</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
