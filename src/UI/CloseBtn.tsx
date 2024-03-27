type CloseBtnProps = {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function CloseBtn({ onClick }: CloseBtnProps) {
	return (
		<button onClick={onClick} className="px-4 py-2 bg-brand text-white hover:brightness-110 rounded">
			닫기
		</button>
	);
}
