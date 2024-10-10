import * as React from "react";
import "./App.css";

const App = () => {
  //Move this to the dropdown component
  //const [open, setOpen] = React.useState(false);

   //Move this to the dropdown component
  // const handleOpen = () => {
  //   setOpen(!open);
  // };

  const handleMenuOne = () => {
    console.log('clicked one');
    alert ('Clicked menu1');
  };

  const handleMenuTwo = () => {
    console.log('clicked two');
    alert ('Clicked menu2');
  };

  return (
    <Dropdown
      trigger={<button>Dropdown</button>}
      menu={[
        <button onClick={handleMenuOne}>Menu 1</button>,
        <button onClick={handleMenuTwo}>Menu 2</button>,
      ]}
    />
  );
};


//However there is still logic of the dropdown component 
//sitting in its parent component App.js.

//When instantiating multiple dropdown components, this will 
//become repetitive logic in each parent component.

//So the next step shows how to elegantly move all repetitive 
//implementation details such as:
//   open state
//   const handleOpen = () => {
//   const [open, setOpen] = React.useState(false);
//into the dropdown component by using 
//React's cloneElement API:

const Dropdown = ({ trigger, menu }) => {

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="dropdown">
       {React.cloneElement(trigger, {
        onClick: handleOpen,
      })}   

      {/* React's cloneElement API allows us to attach props to the passed trigger element (here: opening/closing the dropdown, because it toggles the open state within the dropdown component). */}
      {open ? (
        <ul className="menu">
          {menu.map((menuItem, index) => (
            <li key={index} className="menu-item">{menuItem}
               {React.cloneElement(menuItem, {
                onClick: () => {
                  // Furthermore, the high-level API allows us to close the dropdown once a menu item in a dropdown is clicked while still preserving its native implementation (here: menuItem.props.onClick).
                  menuItem.props.onClick();
                  setOpen(false);
                },
              })}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default App;

/* 
 The reusable dropdown component is finished. What's missing is 
 the implementation detail to close the dropdown if a user 
 clicks outside of it. To do this go to: 

     React Hook: Detect Click outside of Component
     https://www.robinwieruch.de/react-hook-detect-click-outside-component/
*/