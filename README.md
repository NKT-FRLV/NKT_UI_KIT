# 📦 UI Kit Documentation of nkt-ui

#### A lightweight, themeable, and reusable collection of React-based UI components.

---

## ✨ Installation

```bash
npm install nkt-ui
# or
yarn add nkt-ui
```

---

## 🎨 Styles 
#### To apply default styling, you must import the stylesheet manually in your app entry file (e.g. main.tsx or App.tsx):
```ts
import "nkt-ui/dist/style.css";
```

---

### 🤝 Peer Dependencies
#### Make sure react and react-dom are installed in your project:

```bash
npm install react react-dom
```
These are listed as peerDependencies and not bundled with the library.

---

## 📦 Components
```
- Button
- Input
- SearchBar
```

More components coming soon!

---


# 🔘 `<Button />`

#### A flexible button component with support for different options, sizes, and icons.

### 📌 Usage
```tsx
<Button variant="primary" size="lg" onClick={() => alert('Clicked!')}>
  Click Me
</Button>
```

### ✅ Props

| Prop           | Type                                              | Description                                                |
|----------------|---------------------------------------------------|------------------------------------------------------------|
| `variant`      | `"default" | "primary" | "secondary"` etc.       | Button style (default: `"ghost"`)                          |
| `size`         | `"sm" | "md" | "lg"`                             | Button size (default: `"md"`)                              |
| `loading`      | `boolean`                                         | Displays a loading spinner                                 |
| `loadIndicator`| `JSX.Element`                                     | Custom element to use as a loading indicator               |
| `type`         | `"button" | "submit" | "reset"`                  | Native HTML button type                                    |
| `iconOnly`     | `boolean`                                         | If true, renders an icon-only button                       |
| `icon`         | `React.ReactNode`                                 | Icon to render inside the button                           |
| `children`     | `React.ReactNode`                                 | Button label or content                                    |
| `...props`     | `ButtonHTMLAttributes<HTMLButtonElement>`         | Standard HTML button props                                 |


# 🔘 `<Input />`

#### Adaptable input component with icons and an additional action button.

### 📌 Usage
```tsx
<Input
  placeholder="Type..."
  variant="primary"
  icon={<Search />}
  btnText="Search"
  btnAction={() => alert("Searching!")}
/>
```
### ✅ Props

| Prop         | Type                             | Description                                                  |
|--------------|----------------------------------|--------------------------------------------------------------|
| `variant`    | `"default"` \| `"primary"` ...   | Visual border style                                          |
| `sizeVariant`| `"sm"` \| `"md"` \| `"lg"`       | Input size variant                                           |
| `icon`       | `React.ReactNode`                | Icon displayed on the left side inside the input             |
| `btnText`    | `string`                         | Text for the right-side action button                        |
| `btnAction`  | `() => void`                     | Callback for the action button or Enter key press            |
| `...props`   | Standard input attributes        | Any standard HTML input element attributes                   |
---
# 🔘 `<SearchBar />`
#### A search bar component with a UX-optimized design, a search button, and adaption to different styles.

📌 Usage

```tsx
<SearchBar
  placeholder="Search..."
  variant="glass"
  onSearch={(query) => console.log(query)}
  loading={false}
/>
```
### ✅ Props

| Prop           | Type                               | Description                                                  |
|----------------|------------------------------------|--------------------------------------------------------------|
| `placeholder`  | `string`                           | Placeholder text                                             |
| `onSearch`     | `(query: string) => void`          | Callback triggered when search is submitted                 |
| `variant`      | `"default"` \| `"glass"` \| `"minimal"` | Visual style of the search bar                         |
| `value`        | `string`                           | Controlled input value                                       |
| `defaultValue` | `string`                           | Uncontrolled default input value                             |
| `onChange`     | `(value: string) => void`          | Callback triggered on input change                          |
| `loading`      | `boolean`                          | Show loading state                                           |
| `disabled`     | `boolean`                          | Disable the search input                                     |
| `onClear`      | `() => void`                       | Callback to clear the input                                  |
| `autoFocus`    | `boolean`                          | Autofocus the input on mount                                 |
| `id`           | `string`                           | ID for accessibility                                         |
| `aria-label`   | `string`                           | Aria-label for accessibility                                 |


## 📂 Folder Structure
```
lib/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── button.module.css
│   ├── Input/
│   │   ├── Input.tsx
│   │   └── style.module.css
│   └── SearchBar/
│       └── SearchBar.tsx
```