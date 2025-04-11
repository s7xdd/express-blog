export const tableStyles = {
  table:
    "[&_.rc-table-content]:overflow-x-auto [&_table]:w-full [&_.rc-table-row:hover]:bg-gray-100/[0.8] [&_.rc-table-row]:bg-white transition-all duration-300 ease-in-out",
  thead:
    "[&_thead]:text-left rtl:text-right [&_th.rc-table-cell]:uppercase text-xs font-semibold tracking-wide text-gray-700 bg-gray-200 shadow-sm",
  tCell:
    "[&_.rc-table-cell]:px-4 [&_th.rc-table-cell]:py-4 [&_td.rc-table-cell]:py-4 [&_td.rc-table-cell]:border-b [&_td.rc-table-cell]:border-gray-200",
  variants: {
    classic:
      "[&_thead]:bg-gray-100 [&_.rc-table-container]:border-x [&_.rc-table-container]:border-gray-300 [&_td.rc-table-cell]:border-b [&_td.rc-table-cell]:border-gray-300 [&_thead]:border-y [&_thead]:border-gray-300 rounded-t-lg",
    modern: "[&_thead]:bg-gray-100 [&_td.rc-table-cell]:border-b [&_td.rc-table-cell]:border-gray-300",
    minimal: "[&_thead]:bg-gray-100 [&_thead]:shadow-md",
    elegant:
      "[&_thead]:border-b [&_thead]:border-gray-300 [&_td.rc-table-cell]:border-b [&_td.rc-table-cell]:border-gray-300 [&_thead]:py-3 text-gray-900 font-medium",
  },
  striped: "[&_.rc-table-row:nth-child(2n)_.rc-table-cell]:bg-gray-50",
};
