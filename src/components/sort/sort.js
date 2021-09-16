import Dropdown from "../shared/dropdown/dropdown";
import sorts from "../../types/sorts";

const Sort = ({ selectedSort, setSelectedSort }) => {
  return (
    <div className="w-72 top-16">
      <span className="align-center flex flex-col justify-center font-medium">
        Sort By:
      </span>
      <Dropdown
        options={Object.keys(sorts).sort()}
        selected={selectedSort}
        setSelected={setSelectedSort}
      />
    </div>
  );
};

export default Sort;
