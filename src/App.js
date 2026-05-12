import { useState } from "react";
import Form from "./Components/Form";
import {
  Checkbox,
  DateField,
  MultiSelectOption,
  Nummber,
  SelectOption,
  Text,
  TextArea,
} from "./Components/Form/Field";

const options = [
  { value: "frontend", label: "Frontend Developer" },
  { value: "backend", label: "Backend Developer" },
  { value: "fullstack", label: "Full Stack Developer" },
  { value: "designer", label: "UI/UX Designer" },
  { value: "manager", label: "Project Manager" },
];

const genderOptions = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
];

const skillOptions = [
  { value: "react", label: "React" },
  { value: "javascript", label: "JavaScript" },
  { value: "node", label: "Node.js" },
  { value: "css", label: "CSS" },
  { value: "testing", label: "Testing" },
  { value: "figma", label: "Figma" },
];

const themes = [
  { value: "teal", label: "Teal" },
  { value: "indigo", label: "Indigo" },
  { value: "rose", label: "Rose" },
];

function App() {
  const [theme, setTheme] = useState("teal");
  const [columns, setColumns] = useState(2);

  return (
    <main className="app-page">
      <div className="form-settings">
        <div className="setting-group">
          <span>Theme</span>
          <div className="segmented-control" aria-label="Theme">
            {themes.map((item) => (
              <button
                className={theme === item.value ? "active" : ""}
                key={item.value}
                onClick={() => setTheme(item.value)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <label className="setting-group">
          <span>Columns</span>
          <select
            className="column-select"
            onChange={(event) => setColumns(Number(event.target.value))}
            value={columns}
          >
            <option value={1}>1 Column</option>
            <option value={2}>2 Columns</option>
            <option value={3}>3 Columns</option>
          </select>
        </label>
      </div>

      <Form
        columns={columns}
        initialValues={{
          name: "",
          email: "",
          phone: "",
          age: "",
          gender: null,
          role: null,
          skills: [],
          dateOfBirth: "",
          address: "",
          terms: false,
        }}
        onSubmit={(val) => {
          console.log("formValues", val);
        }}
        theme={theme}
      >
        <div className="form-header">
          <p className="form-kicker">Profile details</p>
          <h1>Create Account</h1>
          <p className="form-subtitle">
            Keep the details clear and complete so the profile is ready to use.
          </p>
        </div>

        <div className="form-grid">
          <Text
            name="name"
            title="Full Name"
            minLength={3}
            maxLength={40}
            required
          />
          <Text name="email" title="Email Address" allow="email" required />
          <Text name="phone" title="Phone Number" allow="phone" required />
          <Nummber
            name="age"
            title="Age"
            allow="int"
            minValue={18}
            maxValue={80}
          />
          <SelectOption
            name="gender"
            title="Gender"
            options={genderOptions}
            required
          />
          <SelectOption name="role" title="Role" options={options} required />
          <MultiSelectOption
            name="skills"
            title="Skills"
            options={skillOptions}
            required
          />
          <DateField name="dateOfBirth" title="Date of Birth" required />
          <TextArea
            name="address"
            title="Address"
            minLength={10}
            maxLength={140}
            required
          />
        </div>

        <Checkbox
          name="terms"
          title="Confirmation"
          label="I confirm these details are accurate."
          required
        />

        <div className="form-actions">
          <button className="submit-button" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </main>
  );
}
export default App;
