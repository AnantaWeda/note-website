import { cva } from "class-variance-authority"
import { createContext, useContext, useEffect, useState } from "react"

const initialState = {
    theme: "system",
    setTheme: () => null,
  }

const ThemeProviderContext = createContext(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState(
    () => (localStorage.getItem(storageKey)) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const categoryColor = cva(
    ["transition-all"],
    {
        variants:{
            variant:{
                green: ["bg-green-400","dark:bg-green-500","border-green-700"],
                purple: ["bg-purple-400","dark:bg-purple-500","border-purple-700"],
                yellow: ["bg-yellow-400","dark:bg-yellow-500","border-yellow-700"],
                red: ["bg-red-400","dark:bg-red-500","border-red-700"],
                gray: ["bg-gray-400","dark:bg-gray-500","border-gray-700"]
            },
            status:{
              active: "ring-ring ring-offset-2 border-none"
            },
            element:{
              button: "w-5 h-5 rounded-full cursor-pointer border-2 ring-offset-background ring-2 ms-2"
            }
        }
    }
  );

  const value = {
    theme,
    categoryColor,
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
