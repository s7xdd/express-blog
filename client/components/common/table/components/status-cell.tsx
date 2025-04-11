import cn from "@/utils/class-names";
import { getStatusStyles } from "@/utils/helper/common";
import { STATUS_ARRAY_JSON, STATUS_ENUM } from "@/constants/common/common-constants";

interface StatusCellProps {
  status: STATUS_ENUM;
}

export function StatusCell({ status }: StatusCellProps) {
  const colorClass = getStatusStyles(status);
  return (
    <div className={cn("rounded-md px-2 py-1 font-medium text-xs inline-block", colorClass)}>
      {STATUS_ARRAY_JSON.find((item) => item.value === status)?.label || status}
    </div>
  );
}
