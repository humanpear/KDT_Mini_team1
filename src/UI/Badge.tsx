type Props = {
  count: number;
};

export default function Badge({ count }: Props) {
  return (
    <>
      {count > 0 && (
        <p className="bg-brand text-white w-[24px] h-[24px] rounded-md leading-6 text-center">
          {count}
        </p>
      )}
    </>
  );
}
