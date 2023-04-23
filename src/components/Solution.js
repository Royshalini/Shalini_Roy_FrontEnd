import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";
import './solution.css'
// Single List Item
const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? "green" : "#000000" }}
    //   onClick={onClickHandler(index)} 
    onClick={()=>{onClickHandler(index)}}  // modified
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({ items }) => {
//   const [setSelectedIndex, selectedIndex] = useState();
  const [selectedIndex, setSelectedIndex] = useState(null);  // modified

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: "left" }}>
      { items.map((item, index) => (
        <SingleListItem
         key={index}  // Modified
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
        //   isSelected={selectedIndex}
        isSelected={selectedIndex === index}  // modified
        />
      ))}
    </ul>
  );
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(  //modified here 
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

WrappedListComponent.defaultProps = {
  items: [{text:"Shalini Roy"}], // modified
};

const Solution = memo(WrappedListComponent);

export default Solution;