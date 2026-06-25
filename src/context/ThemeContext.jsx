import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const THEMES = ['gold', 'blue', 'emerald', 'crimson', 'amethyst'];

const ThemeContext = createContext({
    theme: 'gold',
    cycleTheme: () => { },
});

export function ThemeProvider({ children }) {
    const [index, setIndex] = useState(() => {
        const saved = localStorage.getItem('portfolio-theme') || 'gold';
        return Math.max(0, THEMES.indexOf(saved));
    });

    const theme = THEMES[index];

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
    }, [theme]);

    const cycleTheme = useCallback(() => {
        setIndex((prev) => (prev + 1) % THEMES.length);
    }, []);

    return <ThemeContext.Provider value={{ theme, cycleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    return useContext(ThemeContext);
}

export default ThemeContext;
