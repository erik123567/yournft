import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const InputData = (props) => {

      const [data, setData] = useState("");
      const [loading, setLoading] = useState(false);
      const [value, setValue] = useState(new Date('2014-08-18T21:11:54'));


      

      const getBirthData = async () => {
        setLoading(true);
          await axios.get(`http://localhost:8080/getZodiacs/${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()}`)
          .then((res) => {
            setData(res.data);
            console.log(res.data);
          })
          setLoading(false);
          
      }

      const handleChange = (newValue) => {
        setValue(newValue);
      };



      const handleSubmit = e =>{
        e.preventDefault();
        getBirthData();
      }


        return(
            <div>
              
                <h1>When were you born</h1>
                
                <hr></hr>
                
                {loading ? <div className="dots-bars-2" style={{margin:'auto'}}></div>:  ""}   

                {data != '' ?  (                <div>
                  <h4>Chinese Zodiac: {data.chinese}</h4>
                  <h4>Zodiac: {data.zodiac}</h4>
                  <h4>Life Path Number: {data.lifePath}</h4>
                  <div>
                  <img  src={data.nasaImgUrl}></img>
                  </div>
                  <div>
                  <img className='moon'  src={data.moonImgUrl}></img>
                  </div>
                  
                </div>): ''}


                <LocalizationProvider dateAdapter={DateAdapter}>
                  <DesktopDatePicker
                        label="Birth Date"
                        inputFormat="MM/dd/yyyy"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                </LocalizationProvider>
                <Button variant='contained'  onClick={handleSubmit}>Get NFT </Button>
            </div>
        );
}



export default InputData;