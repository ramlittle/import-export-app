//For address form
import cities from "philippines/cities";
import regions from "philippines/regions";
import provinces from "philippines/provinces";

import {useState} from 'react'
const Address=()=>{
    const [iRegion, setIRegion] = useState("");
  const [iProvince, setIProvince] = useState("");
  const [iCity, setICity] = useState("");
  const [street,setStreet]=useState('');
  const [barangay, setBarangay]=useState('');
  const [houseNumber,setHouseNumber]=useState('');
  const [address, setAddress]=useState('')
  
  const handleRegionChange = (e) => {
    setIRegion(e.target.value);
  };
  const handleProvinceChange = (e) => {
    setIProvince(e.target.value);
  };
  const handleCityChange = (e) => {
    setICity(e.target.value);
  };

  
  
    return(
        <>
            {/* Address group */}
            <div className="input-group mb-5">
              <div className="mb-3 w-100">
                <label htmlFor="region">Region:</label>
                <select
                  className="form-select"
                  id="region"
                  value={iRegion}
                  onChange={(e) => handleRegionChange(e)}
                >
                  <option disabled={true} value="">
                    --Select Region--
                  </option>
                  {regions.map((region, index) => (
                    <option key={region.name + index} value={region.key}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 w-100">
                <label htmlFor="province">Province:</label>
                <select
                  className="form-select"
                  id="province"
                  value={iProvince}
                  onChange={(e) => handleProvinceChange(e)}
                >
                  <option disabled={true} value="">
                    --Select Province--
                  </option>
                  {provinces
                    .filter((province, index) => province.region === iRegion)
                    .map((item, index) => {
                      return (
                        <option key={item.name + index} value={item.key}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="mb-3 w-100">
                <label htmlFor="city">City / Municipality:</label>
                <select
                  className="form-select"
                  id="city"
                  value={iCity}
                  onChange={(e) => handleCityChange(e)}
                >
                  <option disabled={true} value="">
                    --Select City / Municipality--
                  </option>
                  {cities
                    .filter((city, index) => city.province === iProvince)
                    .map((item, index) => {
                      return (
                        <option key={item.name + index} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div>
                <label htmlFor='street'>Street:</label>
                <input type ='text' onChange={(e)=>setStreet(e.target.value)}/>
              </div>
              <div>
                <label htmlFor='barangay'>Barangay</label>
                <input type='text' onChange={(e)=>setBarangay(e.target.value)}/>
              </div>
              <div>
                <label htmlFor='houseNumber'>HouseNumber</label>
                <input type='number' onChange={(e)=>setHouseNumber(e.target.value)}/>
              </div>
            </div>
        </>
    )
}
export default Address;