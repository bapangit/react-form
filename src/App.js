import { useState } from "react";
import Form from "./Components/Form";
import { Nummber, SelectOption, Text } from "./Components/Form/Field";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

function App() {
  return (
    <>
      <Form
        initialValues={{ name: "", age: 10, flavour: null }}
        onSubmit={(val) => {
          console.log("formValues", val);
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text
            name="name"
            title="Name"
            minLength={5}
            maxLength={10}
            required
          />
          <Nummber name="age" title="Age" allow="float" />
          <SelectOption name="flavour" title="flavour" options={options} />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </>
  );
}
export default App;
