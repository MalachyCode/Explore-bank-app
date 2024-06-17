import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const Input = styled(MuiInput)`
  width: 42px;
`;

const SalarySliderComponent = () => {
  const [value, setValue] = useState(10000);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? 10000 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 10000) {
      setValue(10000);
    } else if (value > 10000000) {
      setValue(10000000);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id='input-slider' gutterBottom>
        Salary
      </Typography>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby='input-slider'
            size='small'
            min={10000}
            max={10000000}
          />
        </Grid>
        <Grid item>
          <Input
            style={{ width: 90 }}
            value={value}
            size='small'
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1000,
              min: 10000,
              max: 10000000,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalarySliderComponent;
