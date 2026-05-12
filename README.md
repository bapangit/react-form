# React Form

A small Formik-based form example with reusable fields, themes, responsive columns, field spans, and `react-select` support.

## Setup

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm start
```

Build for production:

```bash
npm run build
```

If PowerShell blocks `npm`, run the Windows command shim instead:

```bash
npm.cmd run build
```

## Form Component

Import the wrapper from `src/Components/Form`:

```jsx
import Form from "./Components/Form";
```

Basic usage:

```jsx
<Form
  initialValues={{ name: "", skills: [] }}
  onSubmit={(values) => console.log(values)}
  theme="teal"
  columns={3}
>
  {/* fields go here */}
</Form>
```

### Form Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `initialValues` | object | required | Formik initial values. |
| `onSubmit` | function | required | Formik submit handler. |
| `theme` | string | `"teal"` | Applies one of the built-in themes. |
| `columns` | number | `2` | Number of grid columns, clamped from `1` to `5`. |

Any other props are passed to Formik.

## Themes

Three themes are available:

```jsx
<Form theme="teal" />
<Form theme="indigo" />
<Form theme="rose" />
```

Themes are defined in `src/Components/Form/form-style.css` with CSS variables. Each theme controls accent color, focus shadow, panel color, borders, text color, select options, multi-select chips, checkbox color, and the submit button.

## Columns

The form grid supports 1 to 5 columns:

```jsx
<Form columns={1} />
<Form columns={2} />
<Form columns={3} />
<Form columns={4} />
<Form columns={5} />
```

Responsive behavior:

| Screen size | Layout |
| --- | --- |
| Desktop | Uses the selected `columns` value. |
| Tablet, 641px to 900px | Uses 2 columns. |
| Mobile, 640px and below | Uses 1 column. |

## Field Span

Every field supports `colSpan`. This lets a field take more than one grid cell.

```jsx
<Text name="name" title="Full Name" colSpan={2} />

<TextArea name="address" title="Address" colSpan={3} />
```

Supported span values are `1` to `5`. Spans are clamped by the active form column count, so `colSpan={3}` will not break a 2-column form.

## Available Fields

Import fields from `src/Components/Form/Field`:

```jsx
import {
  Checkbox,
  DateField,
  MultiSelectOption,
  Nummber,
  SelectOption,
  Text,
  TextArea,
} from "./Components/Form/Field";
```

### Text

```jsx
<Text name="email" title="Email Address" allow="email" required />
```

Props:

| Prop | Description |
| --- | --- |
| `name` | Formik field name. |
| `title` | Label text. If omitted, the label is generated from `name`. |
| `required` | Shows a required mark and validates empty values. |
| `allow` | Supports `"email"`, `"phone"`, `"int"`, and `"float"`. |
| `minLength` | Minimum character count. |
| `maxLength` | Maximum character count. |
| `colSpan` | Number of grid cells to span. |

### Nummber

The current component name is `Nummber`.

```jsx
<Nummber name="age" title="Age" allow="int" minValue={18} maxValue={80} />
```

Props:

| Prop | Description |
| --- | --- |
| `allow` | Supports `"int"` and `"float"`. |
| `minValue` | Minimum accepted value. |
| `maxValue` | Maximum accepted value. |

### SelectOption

Single-select field powered by `react-select`.

```jsx
const roleOptions = [
  { value: "frontend", label: "Frontend Developer" },
  { value: "backend", label: "Backend Developer" },
];

<SelectOption name="role" title="Role" options={roleOptions} required />
```

The selected value should be initialized as `null`:

```jsx
initialValues={{ role: null }}
```

### MultiSelectOption

Multi-select field powered by `react-select`.

```jsx
const skillOptions = [
  { value: "react", label: "React" },
  { value: "javascript", label: "JavaScript" },
  { value: "css", label: "CSS" },
];

<MultiSelectOption
  name="skills"
  title="Skills"
  options={skillOptions}
  colSpan={2}
  required
/>
```

The selected value should be initialized as an empty array:

```jsx
initialValues={{ skills: [] }}
```

### DateField

```jsx
<DateField name="dateOfBirth" title="Date of Birth" required />
```

Optional props:

```jsx
<DateField
  name="startDate"
  title="Start Date"
  minDate="2026-01-01"
  maxDate="2026-12-31"
/>
```

### TextArea

```jsx
<TextArea
  name="address"
  title="Address"
  minLength={10}
  maxLength={140}
  colSpan={3}
  required
/>
```

### Checkbox

```jsx
<Checkbox
  name="terms"
  title="Confirmation"
  label="I confirm these details are accurate."
  required
/>
```

Checkbox values should be initialized as booleans:

```jsx
initialValues={{ terms: false }}
```

## Full Example

```jsx
<Form
  columns={3}
  theme="teal"
  initialValues={{
    name: "",
    email: "",
    role: null,
    skills: [],
    address: "",
  }}
  onSubmit={(values) => console.log(values)}
>
  <div className="form-grid">
    <Text name="name" title="Full Name" required />
    <Text name="email" title="Email Address" allow="email" required />
    <SelectOption name="role" title="Role" options={roleOptions} required />
    <MultiSelectOption
      name="skills"
      title="Skills"
      options={skillOptions}
      colSpan={2}
      required
    />
    <TextArea name="address" title="Address" colSpan={3} required />
  </div>

  <div className="form-actions">
    <button className="submit-button" type="submit">
      Submit
    </button>
  </div>
</Form>
```

## Notes

- The layout requires fields to be placed inside a `.form-grid` container.
- Required validation treats `undefined`, `null`, empty strings, and empty arrays as empty.
- Select options use the `{ value, label }` shape expected by `react-select`.
- The form styles live in `src/Components/Form/form-style.css`.
