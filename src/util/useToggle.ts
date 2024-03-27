import { useState } from "react";

export function useToggle(initialValue = false): [boolean, () => void] {
	const [value, setValue] = useState(initialValue);
	const toggleValue = () => setValue(!value);
	return [value, toggleValue];
}
