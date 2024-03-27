import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { AccommodationInfo } from "../../types/AccommodationInfo";
import { useEffect, useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import ko from "date-fns/locale/ko";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useToggle } from "../../hooks/useToggle";
import CloseBtn from "../../UI/CloseBtn";
import { formatDate, formattedDate } from "../../util/date";

type Room = {
	id: string;
	max_capacity: string;
};

type Props = {
	accommodation: AccommodationInfo;
};

const textClass = "text-sm opacity-80";
const textFlex = "flex flex-col";
const iconClass = "text-xl font-semibold";
const btnCustom = "p-2 rounded-full bg-gray-200 hover:brightness-110";

export default function ReservationCard({ accommodation }: Props) {
	const navigate = useNavigate();
	const { id } = useParams();
	const currentDate = new Date();

	const [query, setQuery] = useSearchParams();
	const [date, setDate] = useState({
		startDate: new Date(query.get("check_in") || currentDate),
		endDate: new Date(query.get("check_out") || currentDate),
		key: "selection",
	});

	const [openRoom, toggleRoom] = useToggle();
	const [openDate, toggleDate] = useToggle();
	const [openGuests, toggleGuests] = useToggle();

	const [paymentInfo, setPaymentInfo] = useState({
		room: query.get("room") || "2",
		startDate: query.get("check_in") || "",
		endDate: query.get("check_out") || "",
		guest: query.get("guest") || "1",
	});

	useEffect(() => {
		setQuery({
			room: paymentInfo.room,
			check_in: paymentInfo.startDate,
			check_out: paymentInfo.endDate,
			guest: paymentInfo.guest,
		});
	}, [paymentInfo, setQuery]);

	const handleChange = (ranges: RangeKeyDict) => {
		const { startDate, endDate } = ranges.selection;
		setDate({ startDate: startDate!, endDate: endDate!, key: "selection" });
		setPaymentInfo(prevInfo => ({
			...prevInfo,
			startDate: formatDate(ranges.selection.startDate!),
			endDate: formatDate(ranges.selection.endDate!),
		}));
	};

	const handleClickGuest = (value: number) => {
		setPaymentInfo(prevInfo => {
			const newGuest = +prevInfo.guest + value;
			const maxCapacity = +prevInfo.room;

			if (newGuest >= 1 && newGuest <= maxCapacity) {
				return {
					...prevInfo,
					guest: newGuest.toString(),
				};
			}
			return prevInfo;
		});
	};

	const handleClickRoom = (value: string) => {
		toggleRoom();
		setPaymentInfo(prevInfo => ({
			...prevInfo,
			room: value,
		}));
	};

	const handleClearDate = () => {
		setDate({
			startDate: new Date(),
			endDate: new Date(),
			key: "selection",
		});
	};

	async function handleCart() {
		await fetch("/api/carts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...accommodation, ...paymentInfo }),
		});
	}

	return (
		<div className="w-4/12">
			<div className=" h-min p-6 border rounded-lg sticky top-[200px]">
				<div className="flex items-center gap-2 mb-4">
					<p className="text-xl font-semibold">₩160,000</p>
					<p className="text-sm text-gray-600">/ 박</p>
				</div>
				<div className="border rounded mb-4">
					{/* 숙소형태 */}
					<div className="relative border-b p-4 cursor-pointer">
						<div onClick={toggleRoom} className="flex justify-between items-center">
							<div>
								<span className={textClass}>객실형태</span>
								<p>{paymentInfo.room}인실</p>
							</div>
							{openRoom ? (
								<MdOutlineKeyboardArrowUp className={iconClass} />
							) : (
								<MdOutlineKeyboardArrowDown className={iconClass} />
							)}
						</div>
						{openRoom && (
							<div className="w-full z-10 absolute left-0 p-4 flex flex-col gap-2 bg-white border shadow-md rounded">
								{accommodation.room.map((roomItem: Room) => (
									<button
										key={roomItem.id}
										onClick={() => handleClickRoom(roomItem.max_capacity)}
										className="bg-gray-100 p-2 rounded hover:brightness-90">{`${roomItem.max_capacity} 인실`}</button>
								))}
							</div>
						)}
					</div>
					{/* 체크인-체크아웃 */}
					<div className="relative border-b p-4">
						<div onClick={toggleDate} className="flex justify-between items-center cursor-pointer">
							<div className={textFlex}>
								<span className={textClass}>체크인</span>
								{formattedDate(date.startDate)}
							</div>
							<MdOutlineKeyboardArrowRight className={iconClass} />
							<div className={textFlex}>
								<span className={textClass}>체크아웃</span>
								{formattedDate(date.endDate)}
							</div>
						</div>
						{openDate && (
							<div className="z-10 absolute -top-1/2 -right-1/2 bg-white border shadow-md p-4">
								<DateRange
									locale={ko}
									ranges={[date]}
									onChange={handleChange}
									minDate={new Date()}
									months={2}
									direction="horizontal"
								/>
								<div className="flex justify-end gap-6">
									<button className="underline" onClick={handleClearDate}>
										날짜지우기
									</button>
									{/* <button
										onClick={toggleDate}
										className="px-4 py-2 bg-brand text-white hover:brightness-110 rounded">
										닫기
									</button> */}
									<CloseBtn onClick={toggleDate} />
								</div>
							</div>
						)}
					</div>
					{/* 인원 */}
					<div className="relative p-4">
						<div onClick={toggleGuests} className="flex justify-between items-center cursor-pointer">
							<div>
								<span className={textClass}>인원</span>
								<p>게스트 {paymentInfo.guest === "" ? "1" : paymentInfo.guest}명</p>
							</div>
							{openGuests ? (
								<MdOutlineKeyboardArrowUp className={iconClass} />
							) : (
								<MdOutlineKeyboardArrowDown className={iconClass} />
							)}
						</div>
						<div>
							{openGuests && (
								<div className="flex flex-col gap-4 w-full p-6 z-10 absolute left-0 bg-white border shadow-md rounded">
									<div className="flex gap-6 justify-between">
										<div className="flex flex-wrap">
											<p className={iconClass}>인원</p>
											<span className={textClass}>유아 및 아동도 인원수에 포함해주세요.</span>
										</div>
										<div className="flex justify-between items-center gap-4">
											<button onClick={() => handleClickGuest(1)} className={btnCustom}>
												<FaPlus />
											</button>
											{paymentInfo.guest}
											<button onClick={() => handleClickGuest(-1)} className={btnCustom}>
												<FaMinus />
											</button>
										</div>
									</div>
									<div className="flex justify-end">
										<CloseBtn onClick={toggleGuests} />
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="flex justify-end items-center mb-4 gap-2">
					<button onClick={handleCart} className="p-2 text-2xl bg-gray-100 rounded hover:brightness-90">
						<IoCartOutline />
					</button>
					<button
						onClick={() =>
							navigate(
								`/payment/${id}?room=${paymentInfo.room}&check_in=${paymentInfo.startDate}&check_out=${paymentInfo.endDate}&guest=${paymentInfo.guest}`,
							)
						}
						className="w-10/12 py-2 bg-brand text-white rounded hover:brightness-110">
						예약 하기
					</button>
				</div>
				<p className="mb-4">예약 확정 전에는 요금이 청구되지 않습니다.</p>
				<div className="flex justify-between pb-4 border-b">
					<p className="underline">₩160,000 x 5박</p>
					<p>₩800,000</p>
				</div>
				<div className="flex justify-between pt-4">
					<p>총 합계</p>
					<p>₩800,000</p>
				</div>
			</div>
		</div>
	);
}
