import React,{useEffect, useState} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MapView from './MapView';
import useEth from "../contexts/EthContext/useEth";
import DetailedView from './DetailedView';


export default function ContractDetails({selectedContract}) {
  const { state: { contract, accounts } } = useEth();

  const [locations,setLocations] = useState([]);


    useEffect(()=>{
      fetchLocations()

    },[selectedContract])

    async function fetchLocations(){
      let len_cont = await contract.methods.employee_location_infos_count().call({ from: accounts[0] })
      let locations_list = []
      for (let i=0;i<len_cont;i++){
          let cn = await contract.methods.employee_location_infos(i).call({ from: accounts[0] })
          if(cn.contract_id===selectedContract.id){
            locations_list.push(cn)
          }
      }
      // console.log(selectedContract.id)
      console.log(locations_list)
      setLocations(locations_list)
    }
  return (
    <div>
        <h4>Contract Details</h4>
        <Tabs>
            <TabList style={{backgroundColor:'white'}}>
                <Tab>Detailed View</Tab>
                <Tab>Map View</Tab>
            </TabList>
            <TabPanel>
                <h2>Detialed View</h2>
                <DetailedView locations={locations}/>
            </TabPanel>
            <TabPanel>
                <h2>Map View</h2>
                <MapView locations={locations} selectedContract={selectedContract}/>
            </TabPanel>
          </Tabs>
    </div>
  )
}
