import { useNavigate } from "react-router-dom";
import { AccommodationInfo } from "../../types/AccommodationInfo";

type AccommodationInfoProps = {
	accommodation: AccommodationInfo;
};

export default function AccommodationCard({ accommodation }: AccommodationInfoProps) {
	const { addr1, title, tel, firstimage, contentid } = accommodation;
	const navigate = useNavigate();

	return (
		<li
			className="grid grid-rows-2 "
			onClick={() => {
				navigate(`/product/${contentid}`);
			}}>
			<img
				className="w-full h-full rounded"
				src={
					firstimage === ""
						? "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbHGj34%2FbtsFQwFP0Ae%2FLXaSNC2wWupjePG2p0AcPk%2Fimg.png"
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