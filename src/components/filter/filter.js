import Dropdown from "../shared/dropdown/dropdown";

const Filter = ({ deviceTypes, selectedType, setSelectedType }) => {
  return (
    <div className="w-72 top-16 pr-2">
      <span className="align-center flex flex-col justify-center font-medium">
        Device Type:
      </span>
      <Dropdown
        options={deviceTypes}
        selected={selectedType}
        setSelected={setSelectedType}
      />
    </div>
  );
};

export default Filter;
