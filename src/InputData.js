import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';


const InputData = (props) => {

      const [day, setDay] = useState(1);
      const [month, setMonth] = useState(1);
      const [year, setYear] = useState(1900);
      const [data, setData] = useState("");
      const [loading, setLoading] = useState(false);
      

      

      const getBirthData = async () => {
        setLoading(true);
          // const queryString = `https://miniwebtool.com/what-is-my-zodiac-sign/?birthday=${year}-${month}-${day}`
          // const data = await axios.get(queryString);
          // console.log(data);
          //console.log(`http://localhost:8080/getZodiacs/${year}-${month}-${day}`);
          await axios.get(`http://localhost:8080/getZodiacs/${year}-${month}-${day}`)
          .then((res) => {
            setData(res.data);
            console.log(res.data);
          })
          setLoading(false);
          
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
                 

                </form>
                <button onClick={getBirthData}>GEt it</button>
                <hr></hr>
                {loading ? <div className="lds-ripple"><div></div><div></div></div>:  ""}   

                <div>
                  <h4>Chinese Zodiac: {data.chinese}</h4>
                  <h4>Zodiac: {data.zodiac}</h4>
                  <h4>Life Path Number: {data.lifePath}</h4>
                  <h5>URL IS : {data.imageUrl}</h5>
                  <img className='cropped' src={data.imageUrl}></img>
                  
                </div>

           
            </div>
        );
}



export default InputData;