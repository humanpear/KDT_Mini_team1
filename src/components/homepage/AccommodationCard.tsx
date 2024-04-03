import { AccommodationInfo } from "../../types/AccommodationInfo";
import { IoLocationOutline } from "react-icons/io5";
import { PiPhoneCall } from "react-icons/pi";
import { formatDate } from "../../util/date";

interface AccommodationInfoProps extends React.HTMLAttributes<HTMLLIElement> {
	accommodation: AccommodationInfo;
}

const infoFlex = "flex items-center gap-2";
const infoClass = "text-sm opacity-80";

export default function AccommodationCard({ accommodation }: AccommodationInfoProps) {
	const { address, tel, title, description, image1, id } = accommodation;

	const currentDate = new Date();
	const tomorrowDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

	const handleClick = () => {
		window.open(
			`/product/${id}?check_in=${formatDate(currentDate)}&check_out=${formatDate(tomorrowDate)}&room=2&guest=1`,
			"_blank",
		);
	};

	const prices = accommodation.rooms.map(item => item.price);
	const minPrice = Math.min(...prices);
	const maxPrice = Math.max(...prices);

	return (
		<li
			className="grid grid-rows-2 rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105"
			onClick={handleClick}>
			<img
				className="w-full h-full max-h-56"
				src={
					image1 === ""
						? "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcaVBkP%2FbtsFU7koksb%2FzyBL59ycbUCNllOXfQxiYK%2Fimg.png"
						: image1
				}
				alt={title}
			/>
			<div className="flex flex-col gap-1 p-4">
				<p className="font-semibold my-1 line-clamp-1">{title}</p>
				<p className="font-semibold">
					₩{minPrice.toLocaleString()} ~ {maxPrice.toLocaleString()} / 박
				</p>
				<div className={infoFlex}>
					<PiPhoneCall className={infoClass} />
					<p className={infoClass}>{tel === "" ? "전화번호를 제공하지 않는 업체입니다." : tel}</p>
				</div>
				<div className={infoFlex}>
					<IoLocationOutline className={infoClass} />
					<p className={`${infoClass} line-clamp-1`}>{address}</p>
				</div>
				<p className="my-1 opacity-90 line-clamp-4">{description}</p>
			</div>
		</li>
	);
}
