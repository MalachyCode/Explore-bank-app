import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

interface TitleType {
  title: string;
  handleChange: (event: Event, newValue: number | number[]) => void;
  value: number;
}

const SliderComponent = (props: TitleType) => {
  return (
    <Box sx={{ width: 150 }}>
      <Typography id='input-slider' gutterBottom fontSize={12}>
        {props.title}:{' '}
        {props.title === 'Salary'
          ? 'NGN'
          : props.title !== 'Age' && props.title !== 'Retirement Age'
          ? '%'
          : ''}
        {props.value}
        {props.title === 'Salary' ? '0000' : ''}
      </Typography>
      <Stack spacing={2} direction='row' sx={{ mb: 1 }} alignItems='center'>
        <Slider
          aria-label={props.title}
          size='small'
          value={props.value}
          onChange={props.handleChange}
        />
      </Stack>
    </Box>
  );
};

export default SliderComponent;
