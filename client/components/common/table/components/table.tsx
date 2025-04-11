import Table from "rc-table";
import Pagination from "../../pagination/pagination";
import { tableStyles } from "@/src/components/custom-styles/rc-table-styles";
import cn from "@/src/utils/class-names";

export type ExtractProps<T> = T extends React.ComponentType<infer P> ? P : T;

type RCTableProps = ExtractProps<typeof Table>;

export interface TableProps extends Omit<RCTableProps, "className" | "emptyText"> {
  emptyText?: React.ReactElement;
  variant?: keyof typeof tableStyles.variants;
  striped?: boolean;
  className?: string;
  isLoading?: boolean;
  columns: any[];
  totalCount?: number;
  limit?: number;
  page_size?: number;
}

export default function RcTable({
  striped,
  variant = "minimal",
  emptyText,
  className,
  isLoading = false,
  columns,
  totalCount,
  limit,
  page_size,
  ...props
}: TableProps) {
  return (
    <div className="relative">
      <Table
        className={cn(
          tableStyles.table,
          tableStyles.thead,
          tableStyles.tCell,
          tableStyles.variants[variant],
          striped && tableStyles.striped,
          className,
        )}
        columns={columns}
        data={isLoading ? [] : props.data}
        emptyText={
          isLoading ? (
            <tr>
              <td colSpan={columns.length}>
                <div className="flex items-center justify-center w-full h-full">
                  <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
                </div>
              </td>
            </tr>
          ) : (
            (emptyText ?? <span>Empty</span>)
          )
        }
        {...props}
      />

      {totalCount && limit && page_size && totalCount > limit ? (
        <div className="mt-5">
          <Pagination totalCount={totalCount} limit={limit} page_size={page_size} />
        </div>
      ) : null}
      
    </div>
  );
}

RcTable.displayName = "Table";
