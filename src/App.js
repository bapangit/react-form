import Form from "./Components/Form";
import { Nummber, Text } from "./Components/Form/Field";

function App() {
  return <ReactForm />;
}

export default App;

const ReactForm = () => {
  return (
    <Form
      initialValues={{ name: "", age: 10 }}
      onSubmit={(val) => {
        console.log("formValues", val);
      }}
    >
      <div style={{ display: "flex" }}>
        <Text
          name="name"
          title="Name"
          allow="float"
          minLength={5}
          maxLength={10}
        />
        <Nummber name="age" title="Age" allow="float" required />
      </div>
      <button type="submit">Submit</button>
    </Form>
  );
};
