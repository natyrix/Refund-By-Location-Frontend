import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MapView from './MapView';

export default function ContractDetails({selectedContract}) {
  return (
    <div>
        <h4>Contract Details</h4>
        {selectedContract.id}

        <Tabs>
            <TabList style={{backgroundColor:'white'}}>
                <Tab>Detailed View</Tab>
                <Tab>Map View</Tab>
            </TabList>
            <TabPanel>
                <h2>Detialed View</h2>
            </TabPanel>
            <TabPanel>
                <h2>Map View</h2>
                <MapView selectedContract={selectedContract}/>
            </TabPanel>
          </Tabs>
    </div>
  )
}
