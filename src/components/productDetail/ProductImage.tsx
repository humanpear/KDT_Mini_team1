import { AccommodationInfo } from "../../types/AccommodationInfo";

interface ProductProps {
	accommodation: AccommodationInfo;
}

export default function ProductImage({ accommodation }: ProductProps) {
	
	return (
		<div className="grid grid-cols-2 gap-2 rounded overflow-hidden mb-2">
			<img className="w-full h-full" src={accommodation.image1} alt={accommodation.title} />
			<div className="grid grid-cols-2 gap-2 overflow-hidden">
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
