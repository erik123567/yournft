import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';


const InputData = (props) => {

      const [day, setDay] = useState(1);
      const [month, setMonth] = useState(1);
      const [year, setYear] = useState(1900);
      const [loading, setLoading] = useState(false);
      const [data, setData] = useState("");
      

      

      const getBirthData = async () => {
          // const queryString = `https://miniwebtool.com/what-is-my-zodiac-sign/?birthday=${year}-${month}-${day}`
          // const data = await axios.get(queryString);
          // console.log(data);
          //console.log(`http://localhost:8080/getZodiacs/${year}-${month}-${day}`);
          await axios.get(`http://localhost:8080/getZodiacs/${year}-${month}-${day}`)
          .then((res) => {
            setData(res.data);
            console.log(res.data);
          })
          
          console.log(data);
          
      }



      const handleSubmit = e =>{
        e.preventDefault();
        console.log(day, month, year);
      }



        return(
            <div>
                <h1>When were you born</h1>
                <form onSubmit={handleSubmit}>
                  <label>
                    DAY:
                    <input type='number' max='31' min='1' value={day} onChange={e => setDay(e.target.value)} ></input>
                  </label>
                  <label>
                    MONTH:
                    <input type='number' max='12' min='1' value={month} onChange={e => setMonth(e.target.value)} ></input>
                  </label>
                  <label>
                    YEAR:
                    <input type='number' min='1900' value={year} onChange={e => setYear(e.target.value)} ></input>
                  </label>
                 
                  <button>Submit</button>

                </form>
                <button onClick={getBirthData}>GEt it</button>

            </div>
        );
}



export default InputData;