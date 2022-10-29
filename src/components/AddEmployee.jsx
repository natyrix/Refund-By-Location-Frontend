import { useState, useEffect } from "react";
import useEth from "../contexts/EthContext/useEth";
import './AddEmployee.css'

export default function AddEmployee({setEmployees, setContracts}) {
    const { state: { contract, accounts } } = useEth();
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [radius, setRadius] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [employeeAddress, setEmployeeAddress] = useState("");

    function handleLatChange(e){
        setLat(e.target.value);
    }
    function handleLngChange(e){
        setLng(e.target.value);
    }
    function handleRadiushange(e){
        setRadius(e.target.value);
    }
    function handleNameChange(e){
        setEmployeeName(e.target.value);
    }
    function handleAddressChange(e){
        setEmployeeAddress(e.target.value);
    }

    function emptyForm(){
        setLat("")
        setLng("")
        setRadius("")
        setEmployeeName("")
        setEmployeeAddress("")
    }

    useEffect(()=>{
        fetchEmployees();
        fetchContracts();
    },[]) 

    async function fetchContracts(){
        let len_cont = await contract.methods.contract_info_count().call({ from: accounts[0] })
        let contract_list = []
        for (let i=0;i<len_cont;i++){
            let cn = await contract.methods.contract_infos(i).call({ from: accounts[0] })
            contract_list.push(cn)
        }

        console.log(contract_list)
        setContracts(contract_list)
    }

    async function fetchEmployees(){
        // let len_cont = await contract.methods.contract_info_count().call({ from: accounts[0] })
        let len = await contract.methods.employeecount().call({ from: accounts[0] })
        // console.log("Len Contract");
        // console.log(len_cont);
        console.log("Len");
        console.log(len);

        let ls = []
        for (let i=0;i<len;i++){
            let em = await contract.methods.employees(i).call({ from: accounts[0] })
            ls.push(em)
        }
        console.log(ls)
        setEmployees(ls)
    }

    async function addEmployeeAndCreateContract(e){
        e.preventDefault()
        if(lat!=="" && lng!=="" && radius!=="" && employeeAddress!==""  ){
            let l = lat.split(".").join('')
            let latindex = lat.indexOf('.')
            let lg = lng.split(".").join('')
            let lngindex = lng.indexOf('.')
            console.log(l)
            console.log(latindex)
            let v = await contract.methods.init_employee(employeeName, employeeAddress).send({ from: accounts[0] });
            console.log(v)
            //address _employer_address, address _employee_address, uint[2] memory lat, uint[2] memory lng, uint radius
            let res = await contract.methods.create_contract(
                accounts[0], employeeAddress, [l,latindex], [lg, lngindex], radius
            ).send({ from: accounts[0] })
            console.log(res)
            emptyForm()
            fetchEmployees()
            fetchContracts()
        }
        else{
            alert("All fields are required!")
        }
    }

  return (
    <div className="">
        <h3>Add Employee and Create Contract</h3>
        <div className="addEmployeeForm">
            <form>
                <label htmlFor="en">Employee Name</label>
                <input id="en" type="text" placeholder="Employee Name" value={employeeName} onChange={handleNameChange}/>
                <label htmlFor="ead">Employee Address</label>
                <input id="ead" type="text" placeholder="Employee Address" value={employeeAddress} onChange={handleAddressChange}/>
                <label htmlFor="lt">Latitude</label>
                <input id="lt" type="number" step="any" placeholder="Latitude" value={lat} onChange={handleLatChange}/>
                <label htmlFor="ln">Longitude</label>
                <input id="ln" type="number" step="any" placeholder="Longitude" value={lng} onChange={handleLngChange}/>
                <label htmlFor="rd">Radius In Meters</label>
                <input id="rd" type="number" step="any" placeholder="Radius" value={radius} onChange={handleRadiushange}/>

                <input type="submit" value="Submit" onClick={addEmployeeAndCreateContract}/>
            </form>
        </div>
    </div>
  )
}
