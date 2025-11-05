import { Link } from "umi";
import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";

export default function NotFoundPage() {
  return (
    <div className="section px-[12px] pt-[20vh] text-center">
      <div className="text-2xl font-bold">404 - Page Not Found</div>
      <Link to="/" className="block mt-[12px]">
        <Button icon={<HomeOutlined />}>Go to Home</Button>
      </Link>
    </div>
  );
}
