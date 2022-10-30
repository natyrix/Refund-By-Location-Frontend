import React from 'react'
/**
 * 
 * address employee_address;
        uint contract_id;
        uint coord_long;
        uint lng_offset;
        uint coord_lat;
        uint lat_offset;
        uint distance_from_contract_coord;
        string timestamp;
        bool status;
 */
export default function DetailedView({locations}) {
    function calc_coordinates(coord, index){
        let val = [String(coord).slice(0,index),".",String(coord).slice(index)]
        return val.join('')
    }
  return (
    <div>
        {
            locations.length>0?(
                <table id="employees">
                    <thead>
                        <tr>
                            <th>Contract ID</th>
                            <th>Employee Address</th>
                            <th>Latitude</th>
                            <th>Logitude </th>
                            <th>Distance </th>
                            <th>TimeStamp </th>
                            <th>Result </th>
                        </tr>
                    </thead>
                    <tbody>
                        {locations.map(cs=>
                            <tr key={cs.timestamp}>
                                <td>{cs.contract_id}</td>
                                <td>{cs.employee_address}</td>
                                <td>{calc_coordinates(cs.coord_lat,cs.lat_offset)}</td>
                                <td>{calc_coordinates(cs.coord_long,cs.lng_offset)}</td>
                                <td>{cs.distance_from_contract_coord}</td>
                                <td>{cs.timestamp}</td>
                                <td>{cs.status?"Inbound":"Outboud"}</td>
                            </tr>
                            )}
                    </tbody>
                </table>
            ):(<p>
                ⚠️ Cannot find <span className="code">Recorded Locations</span>
              </p>)}
    </div>
  )
}
