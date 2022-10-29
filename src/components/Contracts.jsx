import React from 'react'
import './Contracts.css'

export default function Contracts({contracts, setSelectedContract, setIsSelected}) {

    function calc_coordinates(coord, index){
        let val = [String(coord).slice(0,index),".",String(coord).slice(index)]
        return val.join('')
    }

    function viewDetials(cs){
        setSelectedContract(cs)
        setIsSelected(true)
    }

  return (
    <div>
        <h3>Contract List</h3>
        <br />
        {
            contracts.length>0?(
                <table id="employees">
                    <thead>
                        <tr>
                            <th>Contract ID</th>
                            <th>Employer Address</th>
                            <th>Employee Address</th>
                            <th>Latitude</th>
                            <th>Logitude </th>
                            <th>Radius </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts.map(cs=>
                            <tr key={cs.id}>
                                <td>{cs.id}</td>
                                <td>{cs.employer_address}</td>
                                <td>{cs.employee_address}</td>
                                <td>{calc_coordinates(cs.coord_lat,cs.lat_offset)}</td>
                                <td>{calc_coordinates(cs.coord_long,cs.lng_offset)}</td>
                                <td>{cs.radius}</td>
                                <td><button onClick={()=>viewDetials(cs)}>View Details</button></td>
                            </tr>
                            )}
                    </tbody>
                </table>
            ):(<p>
                ⚠️ Cannot find <span className="code">Contracts</span>
              </p>)
        }
        
      </div>
  )
}
