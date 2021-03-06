import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import useSWR from 'swr';
import fetch from 'isomorphic-unfetch';
import {useState} from 'react';
const State_Filter = ({product_name,onSelectState}) => {
    const [state, setState] =useState('');
    const handleChange = (event) => {
    setState(event.target.value);
    onSelectState(event.target.value);
  };
  
  const fetcher = async (url) => await fetch(url).then((r) => r.json());
  const {data}  = useSWR('https://assessment-edvora.herokuapp.com/', fetcher);
  var d = data?.filter(obj => obj.product_name == product_name)
  const Unidata = [...new Map(d?.map(item =>
    [item["address"]["state"], item])).values()];
    return (
      <>
        <Box
        sx={{
            fontSize:'h5.fontSize',
            backgroundColor: '#232323',
            color:'white',
            margin:"5%",
            borderRadius: "10px",
          }}>
      <FormControl fullWidth>
        <InputLabel id="stateslabel" style={{color:'white'}}>State</InputLabel>
        <Select
          labelId="stateslabel"
          id="state"
          value={state}
          onChange={handleChange}
          label="State"
          sx={{
              color:'white',
              "& .MuiSvgIcon-root": {
                color: "white",
            },
          }}
        >
          
          {Unidata&&Unidata.map(p =>(<MenuItem value={p.address.state} key={p.address.state}>{p.address.state}</MenuItem>))}
        </Select>
      </FormControl>
      </Box>
     
      </>
    );
}
 
export default State_Filter;