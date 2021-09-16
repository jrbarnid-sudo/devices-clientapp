import { useEffect, useState } from "react";
import {
  getDevices,
  deleteDevice,
  addDevice,
  updateDevice,
} from "./clients/ApiClient";
import sorts from "./types/sorts";
import DeviceTable from "./components/deviceTable";
import Filter from "./components/filter/filter";
import Sort from "./components/sort/sort";

function App() {
  const [devices, setDevices] = useState([]);
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedSort, setSelectedSort] = useState(sorts.capacity);

  useEffect(() => {
    const fetchData = async () => {
      const results = await getDevices();

      if (!results.length) {
        setDeviceTypes(["MAC", "WINDOWS_SERVER", "WINDOWS_WORKSTATION"])
      } else { 
        setDeviceTypes([
          ...new Set(["All", ...results.map((device) => device.type)]),
        ]);
      }

      setDevices(results);
    };

    fetchData();
  }, [setDevices]);

  const handleDelete = async (id) => {
    await deleteDevice(id);

    const results = await getDevices();

    setDevices(results);
  };

  const handleAdd = async (systemName, type, hddCapacity) => {
    await addDevice(systemName, type, hddCapacity);

    const results = await getDevices();

    setDevices(results);
  };

  const handleUpdate = async (id, systemName, type, hddCapacity) => {
    await updateDevice(id, systemName, type, hddCapacity);

    const results = await getDevices();

    setDevices(results);
  };

  return (
    <div className="container mx-auto p-10">
      <div className="flex justify-center">
        <Filter
          deviceTypes={deviceTypes}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        <Sort selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
      </div>
      <DeviceTable
        devices={devices}
        selectedType={selectedType}
        selectedSort={selectedSort}
        deviceTypes={deviceTypes.filter((device) => device !== "All").sort()}
        add={handleAdd}
        remove={handleDelete}
        update={handleUpdate}
      />
    </div>
  );
}

export default App;
