import * as comp from "./components/baseComponents/baseComponentsIndex";
import { useState } from "react";

function App() {
	const [value, setValue] = useState<string>("");
	return (
		<div className="App">
			<comp.Container alignItems="center" justifyContent="center">
				<comp.Input value={value} onChange={(e) => setValue(e.target.value)} />
			</comp.Container>
		</div>
	);
}

export default App;
