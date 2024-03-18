import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const { id } = useParams();

  return <div>ProductDetailPage id: {id}</div>;
}
