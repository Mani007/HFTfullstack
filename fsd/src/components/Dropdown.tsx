import React from 'react'

function Dropdown({onSelect}) {
  return (
    <>
    <div className='m-10'>
    <label htmlFor="type of chain" className='text-white'>Select your chain </label>
    <select onChange={(e)=>onSelect(e.target.value)} defaultValue=''>
        <option value="eth">Ethereum</option>
        <option value="sol">Solona</option>
        <option value="polygon">Polygon</option>
  
    </select>
    </div>
    </>
  )
}

export default Dropdown