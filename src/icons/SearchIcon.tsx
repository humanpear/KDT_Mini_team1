import { IoSearch } from "react-icons/io5";

export default function SearchIcon() {
  return (
    <div className="bg-brand w-[32px] h-[32px] rounded-full flex justify-center items-center absolute top-[8px] right-[8px] cursor-pointer">
      <IoSearch className="text-lg text-white" />
    </div>
  );
}
