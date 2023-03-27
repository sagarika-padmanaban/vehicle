import React, { useEffect, useState } from 'react'
import './App.css'
import Popup from './Popup';

const App = () => {
  const [post, setpost] = useState('');
  const[loading,setloading] = useState(true);
  const [search,setsearch] = useState('');
  const [popup,setpopup] = useState(false);
  const [ind,setindex] = useState('')
  const handlesearch=(e)=>{
      setsearch(e.target.value)
  }
  const handelpopup=(index)=>{
      setindex(index);
      console.log(ind);
      setpopup(true)
  }
  useEffect(() => {
    setloading(true)
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json&page=2").then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data);
      setpost(data.Results)
      setloading(false)
    }).catch((err) => {
      console.log(err);
    })
  }, [])
  return (
    <div className='vehicle'>
      <div className='vehicle-container'>
        <div className='vehicle-top-container'>
          <h1>Vehicle Manufacturers</h1>
        </div>
        <div className='vehicle-mid-container'>
          <div className='input'>
            <label htmlFor='search'>Search : </label>
          <input type='text' id='search' value={search} onChange={(e)=>{handlesearch(e)}}></input>
          </div>
          <div className='dropdown'>
            <label htmlFor='vehicle'>Filter By Type : </label>
            <select name='vehicle' id='vehicle'>
            <option value='All'>All</option>
              <option value='Truck'>Truck</option>
              <option value='Trailer'>Trailer</option>
              <option value='Trailer'>Trailer</option>
              <option value='Passenger Car'>Passenger Car</option>
              <option value='Motorcycle'>Motorcycle</option>
              <option value='Low Speed Vehicle (LSV)'>Low Speed Vehicle (LSV)</option>
              <option value='Multipurpose Passenger Vehicle (MPV)'>Multipurpose Passenger Vehicle (MPV)</option>
            </select>
          </div>
        </div>
        <div className='vehicle-bot-container'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {
                loading?(<p>loading...</p>):(
                  post.map((items,index)=>{
                   return items.VehicleTypes.length>0 && items.Mfr_CommonName!=null?(<tr key={index} onClick={()=>handelpopup(index)}>
                    <td>{(items.Mfr_CommonName)}</td>
                    <td>{(items.Country)}</td>
                    <td>{(items.VehicleTypes[0].Name)}</td>
                   </tr>):null
                  })
                )
              }
            </tbody>
          </table>

        </div>
      </div>
      {popup?(<Popup post={post} setpopup={setpopup} ind={ind}/>):null}

    </div>
  )
}

export default App
