import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Dropdown from "../shared/dropdown/dropdown";

const CreateOrUpdateModal = ({
  isOpen,
  setIsOpen,
  deviceTypes,
  children,
  add,
  handleUpdate,
  isUpdate = false,
  id,
  name,
  type,
  capacity,
}) => {
  const [systemName, setSystemName] = useState("");
  const [systemNameError, setSystemNameError] = useState(false);
  const [selectedType, setSelectedType] = useState("Select Type");
  const [selectedTypeError, setSelectedTypeError] = useState(false);
  const [hddCapacity, setHddCapacity] = useState("");
  const [capacityError, setCapacityError] = useState(false);

  const clearValues = () => {
    setSystemName("");
    setSelectedType("Select Type");
    setHddCapacity("");
  };

  useEffect(() => {
    if (isUpdate) {
      setSystemName(name);
      setSelectedType(type);
      setHddCapacity(capacity);
    } else {
      clearValues();
    }
  }, [capacity, isUpdate, name, type]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const validate = (name, type, capacity) => {
    let valid = true;

    if (!name) {
      setSystemNameError(true);
      valid = false;
    } else {
      setSystemNameError(false);
    }

    if (type === "Select Type") {
      setSelectedTypeError(true);
      valid = false;
    } else {
      setSelectedTypeError(false);
    }

    try {
      parseInt(capacity);

      if (!capacity) {
        setCapacityError(true);
        valid = false;
      } else {
        setCapacityError(false);
      }
    } catch (err) {
      setCapacityError(true);
      valid = false;
    }

    return valid;
  };

  const save = async (name, type, capacity) => {
    const valid = validate(name, type, capacity);

    if (valid) {
      await add(name, type, capacity);
      clearValues();
      toggleModal();
    }
  };

  const update = async (id, name, type, capacity) => {
    const valid = validate(name, type, capacity);

    if (!id) return;

    if (valid) {
      await handleUpdate(id, name, type, capacity);
      toggleModal();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={toggleModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {children}
              </Dialog.Title>
              <div className="mt-2">
                <div className="w-full text-xs">
                  <div className="mb-3 space-y-2 w-full text-xs">
                    <label className="font-semibold text-gray-600 py-2">
                      System Name <abbr title="required">*</abbr>
                    </label>
                    <input
                      placeholder="System Name"
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                      required="required"
                      type="text"
                      name="system-name"
                      id="system-name"
                      value={systemName}
                      onChange={(e) => setSystemName(e.target.value)}
                    />
                    <p
                      className={`text-red-400 text-xs ${
                        systemNameError ? "" : "hidden"
                      }`}
                    >
                      Please provide the system name.
                    </p>
                  </div>
                  <div className="mb-3 space-y-2 w-full text-xs">
                    <label className="font-semibold text-gray-600 py-2">
                      Type <abbr title="required">*</abbr>
                    </label>
                    <Dropdown
                      options={deviceTypes}
                      selected={selectedType}
                      setSelected={setSelectedType}
                    />
                    <p
                      className={`text-red-400 text-xs ${
                        selectedTypeError ? "" : "hidden"
                      }`}
                    >
                      Please select a type.
                    </p>
                  </div>
                  <div className="mb-3 space-y-2 w-full text-xs">
                    <label className="font-semibold text-gray-600 py-2">
                      HDD Capacity (GB) <abbr title="required">*</abbr>
                    </label>
                    <input
                      placeholder="HDD Capacity"
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                      required="required"
                      type="number"
                      name="hdd-capacity"
                      id="hdd-capacity"
                      value={hddCapacity}
                      onChange={(e) => setHddCapacity(e.target.value)}
                    />
                    <p
                      className={`text-red-400 text-xs ${
                        capacityError ? "" : "hidden"
                      }`}
                    >
                      Please enter an HDD capacity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 mr-2"
                  onClick={() =>
                    isUpdate
                      ? update(id, systemName, selectedType, hddCapacity)
                      : save(systemName, selectedType, hddCapacity)
                  }
                >
                  Save
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateOrUpdateModal;
