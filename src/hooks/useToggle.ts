import { useState } from "react";

export function useToggle(initialValue = false): [boolean, () => void, (value: boolean) => void] {
	const [value, setValue] = useState(initialValue);
	const toggleValue = () => setValue(!value);
	const closeToggle = (newValue: boolean) => setValue(newValue);
	return [value, toggleValue, closeToggle];
}

export function useElementToggle(toggleFunc: () => void, ...statesToClose: ((value: boolean) => void)[]) {
	toggleFunc();
	statesToClose.forEach(setState => setState(false));
}
