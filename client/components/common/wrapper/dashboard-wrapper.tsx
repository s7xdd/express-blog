import React from "react";

const DashboardWrapper = ({
  children,
  breadcrumbs,
  filters,
}: {
  children: React.ReactNode;
  breadcrumbs: any[];
  filters?: any[];
}) => {
  return (
    <div className="dashboard-wrapper">
      <div className="flex justify-between">
        <div className="breadcrumbs">
          {breadcrumbs.map((breadcrumb, index) => (
            <span key={index}>
              {breadcrumb}
              {index < breadcrumbs.length - 1 && " / "}
            </span>
          ))}
        </div>
      </div>

      <div className="content">{children}</div>
    </div>
  );
};

export default DashboardWrapper;
