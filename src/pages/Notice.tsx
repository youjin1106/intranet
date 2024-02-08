import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import Pagination from "@mui/material/Pagination";

import Header from "../components/header/Header";
import { NoticeTitle } from "../components/notice/Title";

type NoticeModel = {
	id: string;
	title: string;
	content: string;
	date: string;
};

const Notice = () => {
	const [noticeLists, setNoticeLists] = useState<NoticeModel[]>([]);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		fetch("http://localhost:3001/notice", { method: "GET" })
			.then((res) => res.json())
			.then((data) => {
				setNoticeLists(data);
			});
	}, []);

	const [currentPage, setCurrentPage] = useState(() => {
		const urlParams = new URLSearchParams(location.search);
		return parseInt(urlParams.get("page") || "1", 10);
	});

	const itemsPerPage = 3;
	const count = Math.ceil(noticeLists.length / itemsPerPage);

 const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("page", value.toString());
    navigate(`?${urlParams.toString()}`, { replace: true });
    console.log("event", event);
  };

	const getPageData = () => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return noticeLists.slice(startIndex, endIndex);
	};

		<div className="h-lvh flex flex-col gap-[10px] bg-bg00 flex-1 p-[24px]">
			<Header label="공지사항" />
			<div className="flex-1 flex flex-col justify-between bg-bg01 p-[16px] rounded">
				<div>
					<div className="border-solid border-y border-border order-indigo-600 flex justify-between px-[12px] py-[8px]">
						<span className="text-mdBold">제목</span>
						<span className="text-mdBold">등록일</span>
					</div>

					{getPageData().map((it) => (
						<div className="cursor-pointer" key={it.id}>
							<NoticeTitle
								onClick={() => {
									navigate(`/notice/${it.id}`);
								}}
								title={it.title}
								date={it.date}
							/>{" "}
						</div>
					))}
				</div>
				<div className="flex justify-center">
					<Pagination
						count={count}
						color="primary"
						page={currentPage}
						onChange={handleChange}
						className="pagination"
					/>
				</div>
			</div>
		</div>
	);
};

export default Notice;
