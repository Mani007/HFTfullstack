import React from 'react'

function Dropdown({onSelect}) {
  return (
    <>
    <div className='m-10'>
    <label htmlFor="type of chain" className='text-white'>Select your chain </label>
    <select onChange={(e)=>onSelect(e.target.value)} defaultValue=''>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
  
    </select>
    </div>
    </>
  )
}

export default Dropdown