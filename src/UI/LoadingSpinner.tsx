import { ClipLoader } from "react-spinners";

export default function LoadingSpinner() {
	return (
		<div className="my-4 flex justify-center">
			<ClipLoader color="#FF385C" />
		</div>
	);
}
