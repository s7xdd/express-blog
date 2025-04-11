import React, { ReactNode } from 'react';
import Popover from '@mui/material/Popover';
import cn from '@/utils/class-names';

const PopoverDropdown = ({
    children,
    open,
    anchorEl,
    handleClose,
    customClassName
}: {
    children: ReactNode;
    open: boolean;
    anchorEl: HTMLButtonElement | null;
    handleClose: any;
    customClassName?: any;
}) => {
    const id = open ? 'simple-popover' : undefined;

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            // disableScrollLock
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <div
                className={cn(
                    'flex items-center justify-center',
                    `w-[300px]`,
                    customClassName
                )} >
                {children}
            </div>
        </Popover>
    );
};

export default PopoverDropdown;
