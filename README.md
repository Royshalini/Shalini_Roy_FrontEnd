## Q1 Explain what the simple List component does.

A React component that renders an unordered list of elements is called simple List. A SingleListItem component that can be selected by the user and contains some text serves as a representation of each item in the list.
Each item in the array of items that the List component accepts as a parameter is an object with a distinct id and a text string. The List component updates its state to track the selected item's index when a user clicks an item. The backdrop of the selected item is then emphasised with a green hue, while the backgrounds of the other things are red.
The properties required to render a single item in the list are provided to the SingleListItem component, which is a memoized component. It listens for click events on the item and calls a function passed in as a prop with the index of the clicked item. The SingleListItem component renders a list item with the text and background color specified by its props.

Overall, the List component is a reusable component that can be used to display any array of items in a list format, allowing the user to select an item from the list.
--

## Q2 What problems / warnings are there with code?

The Following are the issue in the code are listed bellow:

1. error in useState Hook that  is used to define selectIndex in this code 
  it should be like 
  ```
  const [selectIndex, setSelectIndex] = useState();
  ```
  as usestate take two arguments one is thet variable and other is with set prifix is used to update that variable ans that ```setSelectIndex``` should be there after ```selectIndex```.
  
 2. As  every list item should have unique id , so that's why we have to pass ```key```  & is selected should have to pass boolean value after comparing that weather the current index is selected or not.
 
 ```<SingleListItem
         key={index}  // Modified here for key 
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
        //   isSelected={selectedIndex}
        isSelected={selectedIndex === index}  // modified here for compare the index  of the current element that if it was selected or not.
        />
        ```
  
  
  3.I  replaced the ```array``` propType with ```arrayOf``` to specifically validate that the items prop is an array, and added the ```isRequired``` flag to indicate that the prop is required.
I  also replaced ```shapeOf```  with shape and added the isRequired flag to the object shape to specify that the text property is required.
These changes ensure that the items prop is properly validated as an array of objects, each with a required text property. like 
```

4. The default props the item should have to be empty or we can pass defaulf item in that insted of  passing NULL Like 
```
WrappedListComponent.defaultProps = {
  items: [{text:"Shalini Roy"}], // modified
  
};

```
or we can pass empty array 
```
WrappedListComponent.defaultProps = {
  items: [{text:" "}], // modified here 
};

```
---
## Q3 Please fix, optimize, and/or modify the component as much as you think is necessary.

Modified Code :
```
import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";
import './List.css'
// Single List Item
const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? "green" : "red" }}
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

const List = memo(WrappedListComponent);

export default List;
```