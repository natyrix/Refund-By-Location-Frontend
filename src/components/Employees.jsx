import React from 'react'

export default function Employees({employees}) {
  return (
    <div>
        <h3>Employee List</h3>
        <br />
        {
            employees.length>0?(
                <table id="employees">
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Employee Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(em=>
                            <tr key={em.employee_address}>
                                <td>{em.name}</td>
                                <td>{em.employee_address}</td>
                            </tr>
                            )}
                    </tbody>
                </table>
            ):(<p>
                ⚠️ Cannot find <span className="code">Employees</span>
              </p>)
        }
        
      </div>
  )
}
