import { useState,useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBell } from '@fortawesome/free-regular-svg-icons';


function App() {
  const [data, setData] = useState()
  const [open, setOpen] = useState(false)
  const [sign, setSign] = useState(false)
     /*   useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:3000/api/scan')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }, 10000); // Fetches data every 5 seconds

    // This is important to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [])    */
  useEffect(() => {
      fetch('http://localhost:3000/api/sites')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.log(error))
    // This is important to clear the interval when the component unmounts
  }, [])
  const toggleDropdown = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  //console.log(data)
 //console.log(open)
  return (
    <>
    <div className="min-h-screen w-full bg-slate-700">
      {/* <h1 className='font-semibold text-white text-3xl text-center'>Latest Chapters</h1> */}
      <div className="mb-3 flex justify-end">
        <div className="flex flex-col">
      <FontAwesomeIcon icon={faBell} className="fa-xl text-white mt-2 mr-2" onClick={() => toggleDropdown()} />
      <div className="relative ">
        {open &&
        <div className="bg-white w-[6rem] p-2 h-[8rem] rounded absolute right-3 ">    
          <h1>Be Notified</h1>
          <button className="mt-[4rem] bg-fuchsia-600 text-white rounded text-center w-full" onClick={() => setSign(true)}>Sign Up</button>
        </div>
        }
      </div>
      </div>
      </div>
      <i class="fa-regular fa-bell"></i>
      <div className="flex gap-5 pr-[5rem] pl-[5rem]">
      <div className="w-[40rem]">
      <h1 className="text-white font-semibold text-2xl">Latest Chapters</h1>
      {data && data.map((key,index) => (
        <div key={index} className="bg-slate-600 p-2 mt-2 flex justify-between">
          <h1 className='font-semibold text-white '>{key.chapter}</h1>
          <button className="bg-fuchsia-600 text-white px-2 rounded"><a href={key.url} target='_blank'>Go</a></button>
        </div>
      ))}
      </div>
      <div className="w-[40rem]">
        <h1 className="text-white font-semibold text-2xl">Recommended Sites</h1>
        <div className="bg-slate-600 p-2 mt-2 flex justify-between">
          <a href='https://ww4.readkingdom.com/' target='_blank' rel='noopener noreferrer'>Read Kingdom</a>
        </div>
      </div>
      </div>
    </div>
    
    </>
  )
}

export default App
