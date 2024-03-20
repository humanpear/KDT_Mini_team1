import { ChangeEvent } from "react";
import CameraIcon from "../../icons/CameraIcon";

type Props = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  file: File | undefined;
};

export default function ImageUpload({ handleChange, file }: Props) {
  return (
    <div>
      <input
        className="hidden"
        id="userImage-upload"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
      <label
        htmlFor="userImage-upload"
        className="block w-[100px] h-[100px] border border-black rounded-full mx-auto relative"
      >
        {file && (
          <img
            className="w-[100px] h-[100px] rounded-full object-cover"
            src={URL.createObjectURL(file)}
            alt="local file"
          />
        )}
        <div className="absolute bottom-[-20px] left-1/2 translate-x-[-50%] py-1 w-[60px] text-center flex justify-evenly items-center rounded-lg bg-white shadow-basic cursor-pointer">
          <CameraIcon />
          <p>추가</p>
        </div>
      </label>
    </div>
  );
}
