
import {
    searchProvince,
    searchRegion,
    searchBaranggay,
    searchMunicipality
  } from './philippines/index.js';

const PhGeoAdmin =()=>{
    async function getAddresses(){
        const allRegions = await searchRegion();
        const allProvinces = await searchProvince();
        const allMunicipalities = await searchMunicipalities();
        const allBaranggays = await searchBaranggays();
    }
    console.log('provinces',getAddresses())
    return (
        <>
            test address
        </>
    )
}

export default PhGeoAdmin;