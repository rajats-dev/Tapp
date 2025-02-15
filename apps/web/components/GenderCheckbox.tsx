const GenderCheckbox = ({
  selectedGender,
  onCheckboxChange,
}: {
  selectedGender: string;
  onCheckboxChange: (gender: "MALE" | "FEMALE") => void;
}) => {
  return (
    <div className="flex items-center gap-2 py-2">
      <div>
        <label className={`flex items-center text-sm gap-1 cursor-pointer`}>
          <span>Male</span>
          <input
            type="checkbox"
            className="border-slate-900"
            checked={selectedGender === "MALE"}
            onChange={() => onCheckboxChange("MALE")}
          />
        </label>
      </div>
      <div>
        <label className={`flex items-center text-sm gap-1 cursor-pointer`}>
          <span>Female</span>
          <input
            type="checkbox"
            className="border-slate-900"
            checked={selectedGender === "FEMALE"}
            onChange={() => onCheckboxChange("FEMALE")}
          />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;
