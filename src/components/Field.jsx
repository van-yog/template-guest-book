import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const data = [
  {
    id: 0,
    value: undefined,
  },
  {
    id: 1,
    value: undefined,
  },
  {
    id: 2,
    value: undefined,
  },
  {
    id: 3,
    value: undefined,
  },
  {
    id: 4,
    value: undefined,
  },
  {
    id: 5,
    value: undefined,
  },
  {
    id: 6,
    value: undefined,
  },
  {
    id: 7,
    value: undefined,
  },
  {
    id: 8,
    value: undefined,
  },
];

const Field = ({ steps, activeField, setActiveField, className }) => {
  const [fieldData, setFieldData] = useState(data);

  useEffect(() => {
    const newData = [...data];

    steps.forEach(
      (item, index) => (newData[item.count].value = index % 2 ? "O" : "X")
    );

    setFieldData(newData);
  }, [steps]);

  const handleClick = (e) => setActiveField(+e.target.id);

  const showValue = (value, index) => {
    if (value) return value;
    if (index === activeField) return steps.length % 2 ? "O" : "X";
  };

  return (
    <div className={`field ${className}`}>
      {fieldData.map(({ id, value }, index) => (
        <div
          onClick={handleClick}
          key={id}
          id={id}
          className={`${index === activeField ? "active" : ""} ${
            value ? "value" : ""
          }`}
        >
          {showValue(value, index)}
        </div>
      ))}
    </div>
  );
};

Field.propTyps = {
  activeField: PropTypes.number,
  className: PropTypes.string,
  setActiveField: PropTypes.func,
  steps: PropTypes.array,
};

Field.defaulProps = {
  steps: [],
};

export default Field;
