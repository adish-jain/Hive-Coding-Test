import "./App.css";
import Dropdown from "./Components/Dropdown/Dropdown";

function App() {
  const singleSelectOptions = [
    { value: "20", label: "Twenty" },
    { value: "21", label: "Twenty One" },
    { value: "21.5", label: "Twenty One and a Half" },
  ];

  const multiSelectOptions = [
    { value: "Oliver", label: "Oliver Hansen" },
    { value: "Van", label: "Van Henry" },
    { value: "April", label: "April Tucker" },
    { value: "Ralph", label: "Ralph Hubbard" },
    { value: "Andrew", label: "Andrew Garfield" },
    { value: "Garfield", label: "Garfield, the fat orange cat" },
    { value: "A", label: "A" },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <p>Hive Coding Test: Reusable Dropdown Component</p>
      </header>
      <div className="App-content">
        <div className="dropdowns-section">
          <Dropdown
            placeHolder="Select a Number"
            dropdownLabel="Age"
            options={singleSelectOptions}
            onChange={() => {}}
          />
          <Dropdown
            placeHolder="Multi-Select Names"
            dropdownLabel="Names"
            options={multiSelectOptions}
            isMulti={true}
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
