import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoadingProps {
  size?: number;
  className?: string;
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = 20, className = '', color = 'inherit', ...props }) => {
  return (
    <Box className={className}>
      <CircularProgress size={size} sx={{ color }} {...props} />
    </Box>
  );
};

export default Loading;