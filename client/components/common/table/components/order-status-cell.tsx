import cn from "@/utils/class-names";
import { ORDER_STATUS_ARRAY_JSON, ORDER_STATUS_ENUM } from "@/constants/order/order-constants";
import { getOrderStatusStyles } from "@/utils/helper/common";

interface OrderStatusCellProps {
  status: ORDER_STATUS_ENUM;
}

export function OrderStatusCell({ status }: OrderStatusCellProps) {
  const colorClass = getOrderStatusStyles(status);
  return (
    <div className={cn("rounded-md px-2 py-1 font-medium text-xs inline-block", colorClass)}>
      {ORDER_STATUS_ARRAY_JSON.find((item) => item.value === status)?.label || status}
    </div>
  );
}
