import { useNavigate } from "react-router-dom";
import { AccommodationInfo } from "../../types/AccommodationInfo";
import { IoLocationOutline } from "react-icons/io5";
import { PiPhoneCall } from "react-icons/pi";

interface AccommodationInfoProps extends React.HTMLAttributes<HTMLLIElement> {
	accommodation: AccommodationInfo;
	innerRef?: React.Ref<HTMLLIElement>;
}

export default function AccommodationCard({ accommodation, innerRef }: AccommodationInfoProps) {
	const { address, tel, title, description, image1, contentid } = accommodation;
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/product/${contentid}`);
	};

	const infoFlex = "flex items-center gap-2";
	const infoClass = "text-sm opacity-80";

	return (
		<li
			ref={innerRef}
			className="grid grid-rows-2 rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105"
			onClick={handleClick}>
			<img
				className="w-full h-full"
				src={
					image1 === ""
						? "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcaVBkP%2FbtsFU7koksb%2FzyBL59ycbUCNllOXfQxiYK%2Fimg.png"
						: image1
				}
				alt={title}
			/>
			<div className="p-4">
				<p className="font-semibold my-1 line-clamp-1">{title}</p>
				<div className={infoFlex}>
					<PiPhoneCall className={infoClass} />
					<p className={infoClass}>{tel}</p>
				</div>
				<div className={infoFlex}>
					<IoLocationOutline className={infoClass} />
					<p className={infoClass}>{address}</p>
				</div>
				<p className="my-1 opacity-90 line-clamp-4">{description}</p>
			</div>
		</li>
	);
}
