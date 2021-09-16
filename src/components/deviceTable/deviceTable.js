import { useState, useEffect } from "react";
import { friendlyTypeName } from "../../utils/utils";
import {
  PencilAltIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import sorts from "../../types/sorts";
import CreateOrUpdateModal from "../createOrUpdateModal/createOrUpdateModal";

const DeviceTable = ({
  devices,
  selectedType,
  selectedSort,
  deviceTypes,
  add,
  remove,
  update,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("Select Type");
  const [capacity, setCapacity] = useState("");

  useEffect(() => {
    if (id && name && type !== "Select Type" && capacity) setModalIsOpen(true);
  }, [capacity, id, name, type]);

  const sortedDevices =
    selectedSort === sorts.capacity
      ? devices.sort((a, b) =>
          parseInt(a.hdd_capacity) < parseInt(b.hdd_capacity) ? -1 : 1
        )
      : devices.sort((a, b) => (a.system_name < b.system_name ? -1 : 1));

  return (
    <section className="p-20">
      <button
        className="flex hover:text-blue-700 text-blue-400 text-white font-bold py-2 px-2 mr-2"
        onClick={() => {
          setId(null);
          setModalIsOpen(true);
        }}
      >
        <PlusCircleIcon
          className="w-5 h-5 mt-0.5 mr-1"
          aria-hidden="true"
          aria-label="Add"
        />
        <span className="align-center flex flex-col justify-center">
          Add Device
        </span>
      </button>
      <div className="flex flex-col justify-center ">
        <table className="table border-separate space-y-6 text-sm">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3 text-left">System Name</th>
              <th className="p-3 text-left">Device Type</th>
              <th className="p-3 text-left">HDD Capacity</th>
              <th className="p-3 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {sortedDevices?.length &&
              sortedDevices
                .filter(
                  (device) =>
                    device.type === selectedType || selectedType === "All"
                )
                .map((device) => (
                  <tr className="bg-blue-200 lg:text-black" key={device.id}>
                    <td className="p-3 font-medium">{device.system_name}</td>
                    <td className="p-3">{friendlyTypeName(device.type)}</td>
                    <td className="p-3">{device.hdd_capacity} GB</td>
                    <td className="p-3 flex">
                      <button
                        className="hover:text-blue-700 text-blue-400 text-white font-bold py-2 px-2 mr-2"
                        onClick={() => {
                          setId(device.id);
                          setName(device.system_name);
                          setType(device.type);
                          setCapacity(device.hdd_capacity);
                          setModalIsOpen(true);
                        }}
                      >
                        <PencilAltIcon
                          className="w-5 h-5"
                          aria-hidden="true"
                          aria-label="Edit"
                        />
                      </button>
                      <button
                        className="font-bold py-2 px-2 mr-2"
                        onClick={() => remove(device.id)}
                      >
                        <TrashIcon
                          className="w-5 h-5 text-red-400 hover:text-red-700 cursor-pointer"
                          aria-hidden="true"
                          aria-label="Delete"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <CreateOrUpdateModal
        key="update"
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        deviceTypes={deviceTypes}
        add={add}
        handleUpdate={update}
        isUpdate={id ? true : false}
        id={id}
        name={name}
        type={type}
        capacity={capacity}
      >
        {id ? "Update" : "Add"} Device
      </CreateOrUpdateModal>
    </section>
  );
};

export default DeviceTable;
