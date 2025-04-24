# Smart Layout Pro

### [Demo](https://www.google.com/)

A flexible and customizable layout component for React that supports resizing, collapsing, and persistent size. It allows you to manage layout sections with horizontal and vertical orientations, with the ability to adjust sizes and remember them across sessions.

## Features

- **Resizable Sections**: Resize layout sections by dragging the edges.
- **Collapsible Sections**: Toggle sections between expanded and collapsed states.
- **Persistent Layout**: Store and persist section sizes across sessions using `localStorage`.
- **Responsive Layout**: Automatically adapts to different screen sizes with responsive configurations.
- **Vertical and Horizontal Layouts**: Supports both vertical and horizontal layouts.
- **Minimum Size Constraint**: Ensures sections don't shrink below a specified size.
- **Animated Transitions**: Smooth transitions when resizing or collapsing sections.

## Installation

To install the package, run the following command in your project directory:

Add tailwind config tailwind.config.js
```ts
{
	content: ["./node_modules/smart-layout/**/*.{js,ts,jsx,tsx}"],
	theme: {
		// ...
	},
	variants: {
		// ...
	},
	plugins: [],
};

```

Add needed packages:

```bash
npm install lucide-react clsx

```

Or

```bash
yarn add lucide-react clsx

```

Or if you're using npm:

```bash
npm install smart-layout-pro
```

```bash
yarn add smart-layout-pro
```

## Usage

### Basic Layout

```tsx
import {SmartLayout} from "smart-layout-pro";

const App = () => (
	<SmartLayout direction="vertical" responsive>
		<SmartLayout.Header resizable>Header Content</SmartLayout.Header>
		<SmartLayout.Body>Main Content</SmartLayout.Body>
		<SmartLayout.Footer>Footer Content</SmartLayout.Footer>
	</SmartLayout>
);
```

### Resizable and Collapsible Sections

```tsx
import {SmartLayout} from "smart-layout-pro";

const App = () => (
	<SmartLayout direction="horizontal">
		<SmartLayout.Header resizable>Header Content</SmartLayout.Header>
		<SmartLayout.Body resizable collapsible>
			Main Content
		</SmartLayout.Body>
		<SmartLayout.Footer>Footer Content</SmartLayout.Footer>
	</SmartLayout>
);
```

### With Persistent Size and Minimum Size

```tsx
import {SmartLayout} from "smart-layout-pro";

const App = () => (
	<SmartLayout direction="vertical">
		<SmartLayout.Header resizable initialSize={200} persistKey="header-size">
			Header Content
		</SmartLayout.Header>
		<SmartLayout.Body resizable minSize="100px" initialSize={400}>
			Main Content
		</SmartLayout.Body>
		<SmartLayout.Footer>Footer Content</SmartLayout.Footer>
	</SmartLayout>
);
```

## Customization

```tsx
import {SmartLayout} from "smart-layout-pro";

const SmartLayoutExample = () => {
	return (
		<div className="w-full h-screen">
			<SmartLayout direction="vertical" preset="card" responsive className="border bg-white shadow">
				<SmartLayout.Header
					resizable
					collapsible
					showToggle
					persistKey="layout-header"
					initialSize={100}
					minSize="60px"
					maxSize="200px"
					animated
				>
					<div className="h-full p-4 bg-blue-100">Header (resizable + collapsible)</div>
				</SmartLayout.Header>

				<SmartLayout.Body>
					<div className="h-full p-4 bg-gray-100 overflow-auto">
						<p className="mb-2">Body (scrollable, grows automatically)</p>
						{[...Array(20)].map((_, i) => (
							<p key={i}>Lorem ipsum #{i + 1}</p>
						))}
					</div>
				</SmartLayout.Body>

				<SmartLayout.Footer minSize="50px" maxSize="120px">
					<div className="h-full p-4 bg-green-100">Footer (static)</div>
				</SmartLayout.Footer>
			</SmartLayout>
		</div>
	);
};

export default SmartLayoutExample;
```

## Props

### SmartLayout

| Prop         | Type                                        | Description                                                 |
| ------------ | ------------------------------------------- | ----------------------------------------------------------- |
| `direction`  | `"vertical"` or `"horizontal"`              | The layout orientation (default: `"vertical"`)              |
| `responsive` | `boolean`                                   | Enables responsive layout (default: `false`)                |
| `preset`     | `"modal"`, `"card"`, `"split"`, `"sidebar"` | Optional preset styles for the layout.                      |
| `className`  | `string`                                    | Custom class names for styling                              |
| `as`         | `string`                                    | The HTML element to render the layout as (default: `"div"`) |

### Section (`SmartLayout.Header`, `SmartLayout.Body`, `SmartLayout.Footer`)

| Prop               | Type                           | Description                                             |
| ------------------ | ------------------------------ | ------------------------------------------------------- |
| `children`         | `ReactNode`                    | Content of the section                                  |
| `resizable`        | `boolean`                      | Whether the section is resizable (default: `false`)     |
| `collapsible`      | `boolean`                      | Whether the section can be collapsed (default: `false`) |
| `collapsed`        | `boolean`                      | Initial collapsed state (default: `false`)              |
| `onToggleCollapse` | `(collapsed: boolean) => void` | Callback when collapsing or expanding the section       |
| `minSize`          | `string`                       | Minimum size of the section (e.g., `"100px"`)           |
| `maxSize`          | `string`                       | Maximum size of the section (e.g., `"500px"`)           |
| `initialSize`      | `number`                       | Initial size in pixels                                  |
| `persistKey`       | `string`                       | The key to store the size in `localStorage`             |
| `animated`         | `boolean`                      | Whether to apply smooth transitions (default: `false`)  |

## License

This project is licensed under the MIT License.
