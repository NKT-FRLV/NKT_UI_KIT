// App.tsx
import { useState } from "react";
import { SearchBar } from "../lib/components/SearchBar/index";
import { Button, ButtonVariant } from "../lib/components/Button/index";
import { Input } from "../lib/components/Input/index";
import { PlaneIcon } from "lucide-react";
// import { ClipLoader } from 'react-spinners';
import "./App.css";
// import "../dist/nkt-ui.css";

const variants: ButtonVariant[] = [
	"default",
	"primary",
	"secondary",
	"danger",
	"success",
	"ghost",
	"warning",
];

function App() {
	const [count, setCount] = useState(0);
	const [value, setValue] = useState("");
	const [loading, setLoading] = useState(false);
	const [variant, setVariant] = useState<ButtonVariant>("default");

	const handleChangeVariant = (variant: ButtonVariant) => {
		setVariant(variant);
	};

	return (
		<>
			<div className="w-full h-full flex flex-col gap-4 items-center justify-center">
				<h1>React Loadscreen UI: {count}</h1>
				<SearchBar
					variant="glass"
					maxLength={10}
					onChange={() => setCount((prev) => prev + 1)}
				/>
				<button onClick={() => setLoading((prev) => !prev)}>
					toggle load
				</button>
				<div className="flex gap-2">
					{variants.map((v) => (
						<Button
							key={v}
							type="button"
							size="md"
							onClick={() => handleChangeVariant(v)}
							variant={v}
						>
							{v.charAt(0).toUpperCase() + v.slice(1)}
						</Button>
					))}
				</div>
				<div className="flex gap-2">
					<Button
						type="button"
						size="sm"
						// iconOnly
						// loadIndicator={<ClipLoader color="#000" size={25} />}
						loading={loading}
						onClick={() => setCount((prev) => prev + 1)}
						icon={<PlaneIcon />}
						variant={variant}
					>
						Штраф
					</Button>
					<Input
						placeholder="Место..."
						sizeVariant="sm"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						icon={<PlaneIcon />}
						btnAction={() => setCount(value.length)}
					/>
				</div>
			</div>
		</>
	);
}

export default App;
