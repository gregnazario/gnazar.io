import { createContext, type ReactNode, useContext } from "react";
import { defaultLocale, type Locale } from "./i18n";

const LocaleContext = createContext<Locale>(defaultLocale);

type LocaleProviderProps = {
	locale: Locale;
	children: ReactNode;
};

export function LocaleProvider({ locale, children }: LocaleProviderProps) {
	return (
		<LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
	);
}

export function useLocale(): Locale {
	return useContext(LocaleContext);
}
