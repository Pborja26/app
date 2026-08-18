import React, { createContext, useState } from "react";
import { fallbackTheme } from "../utils/theme";
import { ITheme } from "../types/theme.types";

interface IGlobalContext {
	theme: ITheme;
	setTheme: React.Dispatch<React.SetStateAction<ITheme>>;
}

export const GlobalContext = createContext({} as IGlobalContext);

export const GlobalContextProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [theme, setTheme] = useState<ITheme>(fallbackTheme);

	const value = {
		theme,
		setTheme,
	};

	return (
		<GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
	);
};
