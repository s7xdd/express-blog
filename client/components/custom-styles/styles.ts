import { Paper, styled, Switch, Typography } from "@mui/material";
import Button from "../common/button/button";

export const SectionTitle = styled(Typography)<{ customStyles?: React.CSSProperties }>(({ theme, customStyles }) => ({
    fontWeight: 600,
    fontSize: "1.25rem",
    color: theme.palette.text.primary,
    ...customStyles,
}));

export const StatisticNumber = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: "1.5rem",
    color: theme.palette.primary.main,
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
        transform: "scale(1.02)",
    },
}));

export const ViewAllButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
    },
}));

export const TrendIndicator = styled(Typography)(({ theme, positive }) => ({
    color: positive ? theme.palette.success.main : theme.palette.error.main,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    "& > svg": {
        marginRight: theme.spacing(0.5),
    },
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    color: theme.palette.text.secondary,
}));

export const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&::before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&::after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));