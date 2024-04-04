import { useNavigate, useParams } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { AccommodationInfo, Room } from "../../types/AccommodationInfo";
import { useContext, useEffect, useRef, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { formatDate, formattedDate } from "../../util/date";
import { RiCloseLine } from "react-icons/ri";
import { OptionContext } from "../../context/OptionProvider";
import DatePicker from "../../UI/DatePicker";
import { ACCESS_TOKEN } from "../../util/auth";

type Props = {
	accommodationData: AccommodationInfo;
};

const textClass = "text-sm opacity-80";
const textFlex = "flex flex-col";
const iconClass = "text-xl font-semibold";
const btnCustom = "p-2 rounded-full bg-gray-200 hover:brightness-90";

export default function ReservationCard({ accommodationData }: Props) {
	const navigate = useNavigate();
	const { id } = useParams();
	const {
		room,
		date,
		guest,
		stayDuration,
		totalPrice,
		finalPrice,
		selectedRoom,
		changeRoom,
		changeGuest,
		clearDate,
		isInvalidDate,
	} = useContext(OptionContext);

	const isActiveUp = +room > +guest;
	const isActiveDown = 1 < +guest;
	const inactiveBtn = "p-2 rounded-full border border-stone-200 text-stone-200 cursor-not-allowed";

	const [success, setSuccess] = useState(false);

	const roomRef = useRef(null);
	const dateRef = useRef(null);
	const guestRef = useRef(null);

	const roomOpenRef = useRef(null);
	const dateOpenRef = useRef(null);
	const guestOpenRef = useRef(null);

	const [openOptionType, setOpenOptionType] = useState("none");
	const isRoom = openOptionType === "room";
	const isDate = openOptionType === "date";
	const isGuest = openOptionType === "guest";

	function changeOpenOptionType(type: string) {
		if (openOptionType === type) {
			setOpenOptionType("none");
		} else {
			setOpenOptionType(type);
		}
	}

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				(roomRef.current &&
					!(roomRef.current as HTMLElement).contains(event.target as Node) &&
					roomOpenRef.current &&
					!(roomOpenRef.current as HTMLElement).contains(event.target as Node)) ||
				(dateRef.current &&
					!(dateRef.current as HTMLElement).contains(event.target as Node) &&
					dateOpenRef.current &&
					!(dateOpenRef.current as HTMLElement).contains(event.target as Node)) ||
				(guestRef.current &&
					!(guestRef.current as HTMLElement).contains(event.target as Node) &&
					guestOpenRef.current &&
					!(guestOpenRef.current as HTMLElement).contains(event.target as Node))
			) {
				setOpenOptionType("none");
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleCart = async () => {
		await fetch(`${import.meta.env.VITE_API_URL}/api/carts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
			body: JSON.stringify({
				room_id: selectedRoom?.id,
				capacity: +guest,
				start_date: formatDate(date.startDate),
				end_date: formatDate(date.endDate),
				total_price: finalPrice,
			}),
		});
		setSuccess(true);
		setTimeout(() => setSuccess(false), 3000);
	};

	return (
		<div className="lg:w-6/12 xl:w-5/12">
			<div className="h-min p-6 border rounded-lg lg:sticky lg:top-[200px]">
				<div className="flex items-center gap-2 mb-4">
					{room && (
						<div>
							{accommodationData.rooms.map((roomItem: Room) => {
								if (roomItem.max_capacity.toString() === room) {
									return (
										<p key={roomItem.id} className="text-xl font-semibold">
											₩{roomItem.price.toLocaleString()}
										</p>
									);
								}
							})}
						</div>
					)}
					<p className="text-sm text-gray-600">/ 박</p>
				</div>
				<div className="border rounded mb-4">
					{/* 숙소형태 */}
					<div ref={roomOpenRef} className="relative border-b cursor-pointer">
						<div onClick={() => changeOpenOptionType("room")} className="flex justify-between items-center p-4">
							<div>
								<span className={textClass}>객실형태</span>
								<p>{room}인실</p>
							</div>
							{isRoom ? (
								<MdOutlineKeyboardArrowUp className={iconClass} />
							) : (
								<MdOutlineKeyboardArrowDown className={iconClass} />
							)}
						</div>
						{isRoom && (
							<div
								ref={roomRef}
								className="w-full z-10 absolute left-0 p-4 flex flex-col gap-2 bg-white border shadow-md rounded">
								{accommodationData.rooms.map((roomItem: Room) => (
									<button
										key={roomItem.id}
										onClick={() => {
											changeRoom(roomItem.max_capacity.toString());
											setOpenOptionType("none");
										}}
										className="bg-gray-100 p-2 rounded hover:brightness-90">{`${roomItem.max_capacity} 인실`}</button>
								))}
							</div>
						)}
					</div>
					{/* 체크인-체크아웃 */}
					<div ref={dateOpenRef} className="relative border-b">
						<div
							onClick={() => changeOpenOptionType("date")}
							className="flex justify-between items-center cursor-pointer p-4">
							<div className={isInvalidDate ? `${textFlex} text-brand` : textFlex}>
								<span className={textClass}>체크인</span>
								{formattedDate(date.startDate)}
							</div>
							<MdOutlineKeyboardArrowRight className={iconClass} />
							<div className={isInvalidDate ? `${textFlex} text-brand` : textFlex}>
								<span className={textClass}>체크아웃</span>
								{formattedDate(date.endDate)}
							</div>
						</div>
						{isDate && (
							<div
								ref={dateRef}
								className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border shadow-md p-4">
								<div className="md:hidden">
									<DatePicker months={1} />
								</div>
								<div className="hidden md:block">
									<DatePicker months={2} />
								</div>
								<div className="flex justify-end gap-6">
									<button className="underline" onClick={clearDate}>
										날짜지우기
									</button>
								</div>
								{isInvalidDate && (
									<p className="bg-white text-center pb-2 text-brand">선택불가능한 날짜입니다.</p>
								)}
							</div>
						)}
					</div>
					{/* 인원 */}
					<div ref={guestOpenRef} className="relative">
						<div
							onClick={() => changeOpenOptionType("guest")}
							className="flex justify-between items-center cursor-pointer p-4">
							<div>
								<span className={textClass}>인원</span>
								<p>게스트 {guest}명</p>
							</div>
							{isGuest ? (
								<MdOutlineKeyboardArrowUp className={iconClass} />
							) : (
								<MdOutlineKeyboardArrowDown className={iconClass} />
							)}
						</div>
						<div>
							{isGuest && (
								<div
									ref={guestRef}
									className="flex flex-col gap-4 w-full p-6 z-10 absolute left-0 bg-white border shadow-md rounded">
									<div className="flex gap-6 justify-between">
										<div className="flex flex-wrap">
											<p className={iconClass}>인원</p>
											<span className={textClass}>유아 및 아동도 인원수에 포함해주세요.</span>
										</div>
										<div className="flex justify-between items-center gap-4">
											<button
												onClick={() => changeGuest(-1)}
												className={isActiveDown ? btnCustom : inactiveBtn}
												disabled={!isActiveDown}>
												<FaMinus />
											</button>
											{guest}
											<button
												onClick={() => changeGuest(1)}
												className={isActiveUp ? btnCustom : inactiveBtn}
												disabled={!isActiveUp}>
												<FaPlus />
											</button>
										</div>
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
								`/payment/${id}?check_in=${formatDate(date.startDate)}&check_out=${formatDate(
									date.endDate,
								)}&room=${room}&guest=${guest}`,
							)
						}
						className="w-10/12 py-2 bg-brand text-white rounded hover:brightness-110">
						예약 하기
					</button>
				</div>
				{success ? (
					<div className="flex justify-between mb-4">
						<p>✅ 장바구니에 추가되었습니다.</p>
						<button className="underline" onClick={() => navigate(`/cart`)}>
							장바구니 보기
						</button>
					</div>
				) : (
					<p className="mb-4">예약 확정 전에는 요금이 청구되지 않습니다.</p>
				)}
				<div className="flex justify-between mb-2">
					<div className="flex items-center gap-2">
						<div>
							{accommodationData.rooms.map((roomItem: Room) => {
								if (roomItem.max_capacity.toString() === room) {
									return <p key={roomItem.id}>₩{roomItem.price}</p>;
								}
							})}
						</div>
						<RiCloseLine className="text-sm" />
						<p>{stayDuration}박</p>
					</div>
					<p>₩{totalPrice.toLocaleString()}</p>
				</div>
				<div className="flex justify-between pb-4 border-b">
					<p>미니비앤비 수수료</p>
					<p>₩{(totalPrice / 10).toLocaleString()}</p>
				</div>
				<div className="flex justify-between pt-4 text-xl font-semibold">
					<p>총 합계</p>
					<p>₩{finalPrice.toLocaleString()}</p>
				</div>
			</div>
		</div>
	);
}
