import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import Typography from '@mui/material/Typography';

interface TitleType {
  title: string;
}

const SliderComponent = (props: TitleType) => {
  const [value, setValue] = useState<number>(30);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Box sx={{ width: 150 }}>
      <Typography id='input-slider' gutterBottom fontSize={13}>
        {props.title}: {value}
      </Typography>
      <Stack spacing={2} direction='row' sx={{ mb: 1 }} alignItems='center'>
        <Slider
          aria-label={props.title}
          size='small'
          value={value}
          onChange={handleChange}
        />
      </Stack>
    </Box>
  );
};

export default SliderComponent;
