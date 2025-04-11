import React from "react";
import { Typography } from "@mui/material";
import Button from "../button/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ComponentWrapper = ({
  children,
  title,
  enableRightButton,
  buttonClassName,
  rightContents,
  buttonBorderRadius = true,
  classSx = {},
  titleClassName,
  rightContentSx = {},
  rightButtonProps = {},
  rightButtonText = "Add New Product", // More descriptive label
  rightButtonLink,
  customStyles = {},
  enableBreadcrumbs = false,
}: {
  children: React.ReactNode;
  title: any;
  enableRightButton?: boolean;
  rightButtonLink?: string;
  rightContents?: any;
  classSx?: React.CSSProperties;
  rightContentSx?: React.CSSProperties;
  rightButtonProps?: React.ComponentProps<typeof Button>;
  rightButtonText?: string;
  titleClassName?: string;
  buttonClassName?: string;
  buttonBorderRadius?: boolean;
  customStyles?: React.CSSProperties;
  enableBreadcrumbs?: boolean;
}) => {
  const pathname = usePathname();

  const breadcrumbLinks = () => {
    const pathSegments = pathname.split("/").filter(Boolean);
    let currentPath = "";

    return pathSegments.map((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      return (
        <React.Fragment key={index}>
          <Link className="inline-flex items-center gap-2 text-sm text-gray-700 font-medium" href={currentPath}>
            {segment.charAt(0).toUpperCase() + segment.slice(1)}
          </Link>
          {!isLast && <span className="h-1 w-1 rounded-full bg-gray-300" />}
        </React.Fragment>
      );
    });
  };

  return (
    <div style={{ ...customStyles }}>
      <div className="flex justify-between items-center mb-2" style={{ ...classSx }}>
        <div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between">
          <div>
            <h4
              className={`MuiTypography-root MuiTypography-h4 mb-2 text-[22px] lg:text-2xl 4xl:text-[26px] css-1xvinid ${titleClassName}`}
            >
              {title}
            </h4>

            {enableBreadcrumbs && pathname && pathname.split("/").length > 2 ? (
              <div className="inline-flex items-center gap-2.5 flex-wrap">{breadcrumbLinks()}</div>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {" "}
          <div>{rightContents ? rightContents : null}</div>
          {enableRightButton ? (
            <Button
              variant="outlined"
              borderRadius={buttonBorderRadius}
              radius={3}
              className={`${buttonClassName}`}
              href={rightButtonLink}
              size="small"
              {...rightButtonProps}
            >
              {rightButtonText}
            </Button>
          ) : null}
        </div>
      </div>
      {children}
    </div>
  );
};

export default ComponentWrapper;
