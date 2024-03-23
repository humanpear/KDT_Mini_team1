import { useNavigate, useParams } from "react-router-dom";
import { AccommodationInfo } from "../../types/AccommodationInfo";
import { IoLocationOutline } from "react-icons/io5";
import { PiPhoneCall } from "react-icons/pi";

interface AccommodationInfoProps extends React.HTMLAttributes<HTMLLIElement> {
	accommodation: AccommodationInfo;
	innerRef?: React.Ref<HTMLLIElement>;
}

export default function AccommodationCard({ accommodation, innerRef }: AccommodationInfoProps) {
	const { address, tel, title, description, image1 } = accommodation;
	const { id } = useParams();
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/product/${id}`);
	};

	const infoFlex = "flex items-center gap-2";
	const infoClass = "text-sm opacity-80";

	return (
		<li ref={innerRef} className="grid grid-rows-2 " onClick={handleClick}>
			<img
				className="w-full h-full rounded"
				src={
					image1 === ""
						? "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcaVBkP%2FbtsFU7koksb%2FzyBL59ycbUCNllOXfQxiYK%2Fimg.png"
						: image1
				}
				alt={title}
			/>
			<div>
				<p className="font-semibold my-1 line-clamp-1">{title}</p>
				<div className={infoFlex}>
					<PiPhoneCall className={infoClass} />
					<p className={infoClass}>{tel}</p>
				</div>
				<div className={infoFlex}>
					<IoLocationOutline className={infoClass} />
					<p className={infoClass}>{address}</p>
				</div>
				<p className="my-1 opacity-90 line-clamp-2">{description}</p>
			</div>
		</li>
	);
}
