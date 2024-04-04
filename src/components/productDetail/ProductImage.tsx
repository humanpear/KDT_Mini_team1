import { AccommodationInfo } from "../../types/AccommodationInfo";

interface ProductProps {
	accommodationData: AccommodationInfo;
}

export default function ProductImage({ accommodationData }: ProductProps) {
	const { image1, title } = accommodationData;

	return (
		<div className="gap-2 rounded overflow-hidden mb-2 xl:grid xl:grid-cols-2">
			<img
				className="h-full rounded lg:w-full lg:max-h-[462px] lg:max-w-[900px] lg:m-auto xl:max-h-[362px] xl:rounded-none"
				src={
					image1 === ""
						? "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcaVBkP%2FbtsFU7koksb%2FzyBL59ycbUCNllOXfQxiYK%2Fimg.png"
						: image1
				}
				alt={title}
			/>
			<div className="hidden xl:grid xl:grid-cols-2 xl:gap-2">
				<img
					src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt=""
				/>
				<img
					src="https://images.unsplash.com/photo-1631049035182-249067d7618e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt=""
				/>
				<img
					src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt=""
				/>
				<img
					src="https://images.unsplash.com/photo-1572987669554-0ba2ba9aee1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt=""
				/>
			</div>
		</div>
	);
}
