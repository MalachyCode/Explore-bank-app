import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface InputType {
  label: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: string;
}

const InputComponent = (props: InputType) => {
  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: 150 },
      }}
      noValidate
      autoComplete='off'
    >
      <div>
        {/* <TextField
          id='filled-number'
          label={props.label}
          type='number'
          size='small'
          style={{ height: '50px' }}
          InputLabelProps={{
            shrink: true,
          }}
          variant='filled'
          onChange={props.handleChange}
          value={props.value}
        /> */}
        <TextField
          id={!isNaN(Number(props.value)) ? 'filled-search' : 'filled-error'}
          error={!isNaN(Number(props.value)) ? false : true}
          helperText={!isNaN(Number(props.value)) ? '' : 'Number required'}
          label={props.label}
          type='search'
          size='small'
          style={{
            height: !isNaN(Number(props.value)) ? '50px' : '100px',
            overflow: 'hidden',
          }}
          variant='filled'
          onChange={props.handleChange}
          value={props.value}
        />
      </div>
    </Box>
  );
};

export default InputComponent;
