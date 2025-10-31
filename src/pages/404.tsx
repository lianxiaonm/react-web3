import React from "react";
import { Link } from "umi";
import { Button } from "antd";

export function NotFoundPage() {
  return (
    <div className="section p-[12px] gap-[12px]">
      <div className="text-2xl font-bold">404 - Page Not Found</div>
      <Button type="text">
        <Link to="/" className="block">
          Go to Home
        </Link>
      </Button>
    </div>
  );
}
