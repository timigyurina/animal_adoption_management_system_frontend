import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectValues = ({
  choosableItems,
  value,
  onChange,
  label,
  selectName,
  small,
  withDefault,
}) => {
  return (
    <>
      {Object.entries(choosableItems).length > 0 ? (
        <FormControl
          sx={{
            m: 1,
            minWidth: 200,
          }}
          size={small && "small"}
        >
          <InputLabel>{label}</InputLabel>
          <Select name={selectName} value={value} onChange={onChange}>
            {withDefault && <MenuItem value={""}>Select a(n) {label}</MenuItem>}
            {Object.entries(choosableItems).map(([name, value]) => (
              <MenuItem value={name} key={value}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        `No ${label} to choose from`
      )}
    </>
  );
};

export default SelectValues;
