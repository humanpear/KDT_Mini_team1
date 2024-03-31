import { AccommodationInfo } from "../../types/AccommodationInfo";
import { IoLocationOutline } from "react-icons/io5";
import { PiPhoneCall } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../util/date";

interface AccommodationInfoProps extends React.HTMLAttributes<HTMLLIElement> {
  accommodation: AccommodationInfo;
}

export default function AccommodationCard({
  accommodation,
}: AccommodationInfoProps) {
  const { address, tel, title, description, image1, id } = accommodation;
  const navigate = useNavigate();

  const currentDate = new Date();
  const tomorrowDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

  const handleClick = () => {
    // window.open(`/product/${contentid}`, "_blank");
    // 새탭이 열릴 시 사라지는 상태를 막기위해 백엔드 API와 연결하기 전에는 그냥 navigate로 페이지 이동하겠습니다.
    navigate(
      `/product/${id}?check_in=${formatDate(
        currentDate
      )}&check_out=${formatDate(tomorrowDate)}&room=2&guest=1`
    );
  };

  const infoFlex = "flex items-center gap-2";
  const infoClass = "text-sm opacity-80";

  return (
    <li
      className="grid grid-rows-2 rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105"
      onClick={handleClick}
    >
      <img
        className="w-full h-full"
        src={
          image1 === ""
            ? "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcaVBkP%2FbtsFU7koksb%2FzyBL59ycbUCNllOXfQxiYK%2Fimg.png"
            : image1
        }
        alt={title}
      />
      <div className="p-4">
        <p className="font-semibold my-1 line-clamp-1">{title}</p>
        <div className={infoFlex}>
          <PiPhoneCall className={infoClass} />
          <p className={infoClass}>{tel}</p>
        </div>
        <div className={infoFlex}>
          <IoLocationOutline className={infoClass} />
          <p className={infoClass}>{address}</p>
        </div>
        <p className="my-1 opacity-90 line-clamp-4">{description}</p>
      </div>
    </li>
  );
}
