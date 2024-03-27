import { GrFormPrevious } from "react-icons/gr";

export default function PrevIcon({ ...props }) {
  return (
    <GrFormPrevious
      className="text-3xl absolute top-0 left-[-40px] cursor-pointer"
      {...props}
    />
  );
}
