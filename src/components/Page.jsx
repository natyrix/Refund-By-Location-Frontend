import { useState } from "react";
import useEth from "../contexts/EthContext/useEth";
import AddEmployee from "./AddEmployee";
import ContractDetails from "./ContractDetails";
import Contracts from "./Contracts";
import Employees from "./Employees";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";



export default function Page() {
  const { state } = useEth();
  const [employees, setEmployees] = useState([])
  const [contracts, setContracts] = useState([])

  const [selectedContract, setSelectedContract] = useState(null)
  const [isSelected, setIsSelected] = useState(false)


  const page = <>
    <AddEmployee setEmployees={setEmployees} setContracts={setContracts}/>
    <hr />
    <Employees employees={employees}/>
    <hr />
    <Contracts contracts={contracts} setIsSelected={setIsSelected} setSelectedContract={setSelectedContract}/>
    <hr />
    <h4>Select a contract to view details</h4>
    {(isSelected && selectedContract!==null) && <ContractDetails selectedContract={selectedContract}/>}

    <hr />


  </>

  return (
    <div className="demo">
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            page
      }
    </div>
  );
}
