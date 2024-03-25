import { useNavigate } from "react-router-dom";
import { AccommodationInfo } from "../../types/AccommodationInfo";

interface AccommodationInfoProps extends React.HTMLAttributes<HTMLLIElement> {
	accommodation: AccommodationInfo;
	innerRef?: React.Ref<HTMLLIElement>;
}

export default function AccommodationCard({ accommodation, innerRef }: AccommodationInfoProps) {
	const { addr1, title, tel, firstimage, contentid } = accommodation;
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/product/${contentid}`);
	};

	return (
		<li ref={innerRef} className="grid grid-rows-2 " onClick={handleClick}>
			<img
				className="w-full h-full rounded"
				src={
					firstimage === ""
						? "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcaVBkP%2FbtsFU7koksb%2FzyBL59ycbUCNllOXfQxiYK%2Fimg.png"
						: firstimage
				}
				alt={title}
			/>
			<div>
				<p className="font-semibold my-2 line-clamp-2">{title}</p>
				<p className="text-sm opacity-80">{tel}</p>
				<p className="text-sm opacity-80">{addr1}</p>
			</div>
		</li>
	);
}
