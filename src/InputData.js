import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';


const InputData = (props) => {

      const [day, setDay] = useState(1);
      const [month, setMonth] = useState(1);
      const [year, setYear] = useState(1900);
      const [loading, setLoading] = useState(false);
      const [data, setData] = useState("");



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

            </div>
        );
}



export default InputData;