import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { teal } from '@mui/material/colors';

const SwitchBtn = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: teal[300],
    '&:hover': {
      backgroundColor: alpha(teal[300], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: teal[300],
  },
}));

const SwitchButton = ({ handleChange }) => {
  return <SwitchBtn onChange={handleChange}></SwitchBtn>;
};

export default SwitchButton;
