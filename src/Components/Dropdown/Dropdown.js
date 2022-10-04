import React, { useState, useEffect } from "react";
import DropdownIcon from "./icons/DropdownIcon.js";
import DropupIcon from "./icons/DropupIcon.js";
import CloseIcon from "./icons/CloseIcon.js";
import "./Dropdown.css";
import PropTypes from 'prop-types'

const Dropdown = ({ placeHolder, dropdownLabel, options, isMulti, onChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [value, setValue] = useState(isMulti ? [] : null);

  useEffect(() => {
    return () =>
      isMulti
        ? options.unshift({ value: "All", label: "Select All" })
        : options.unshift({ value: "None", label: "None" });
  }, []);

  const handleInputClick = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const onClickHandler = (option) => {
    let newValue;
    if (isMulti) {
      if (option.value === "All") {
        newValue = options.slice(1, options.length);
        options[0] = { value: "None", label: "Deselect All" };
      } else if (option.value === "None") {
        newValue = [];
        options[0] = { value: "All", label: "Select All" };
      } else if (value.findIndex((item) => item.value === option.value) >= 0) {
        newValue = removeOption(option);
      } else {
        newValue = [...value, option];
      }
    } else {
      option.value === "None" ? (newValue = null) : (newValue = option);
    }
    setValue(newValue);
    onChange(newValue);
  };

  const isSelected = (option) => {
    if (isMulti) {
      return value.filter((item) => item.value === option.value).length > 0;
    }
    if (!value) {
      return false;
    }
    return value.value === option.value;
  };

  const removeOption = (option) => {
    return value.filter((item) => item.value !== option.value);
  };

  const onTagRemove = (e, option) => {
    e.stopPropagation();
    setValue(removeOption(option));
    onChange(value);
  };

  const getDisplay = () => {
    if (!value || value.length === 0) {
      return placeHolder;
    }
    if (isMulti) {
      return (
        <div className="dropdown-tags">
          {value.map((option) => {
            return (
              <div key={option.value} className="dropdown-tag-item">
                {option.label}
                <span
                  onClick={(e) => onTagRemove(e, option)}
                  className="dropdown-tag-close"
                >
                  <CloseIcon />
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    return value.label;
  };

  return (
    <div>
      <div className="dropdown-container" id="container">
        <div className="dropdown-input" onClick={handleInputClick}>
          <div className="dropdown-selected-value">{getDisplay()}</div>
          <div className="dropdown-icons">
            <div className="dropdown-icon">
              {menuOpen ? <DropupIcon /> : <DropdownIcon />}
            </div>
          </div>
        </div>
        <div className="dropdown-label">
          {dropdownLabel}
        </div>
      </div>
      {menuOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option.value}
              className={`dropdown-item ${isSelected(option) && "selected"}`}
              onClick={() => onClickHandler(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  placeHolder: PropTypes.string,
  dropdownLabel: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  isMulti: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Dropdown;
