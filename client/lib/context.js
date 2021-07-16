import React, { useContext, createContext } from 'react'

//Context
export const AppContext = createContext(null)

//Provider
export const AppContextProvider = ({ children }) => {
	const [authState, setAuth] = React.useState(false)

	React.useEffect(() => {}, [])

	const values = React.useMemo(
		() => ({
			authState,
			setAuth,
		}),
		[authState]
	)

	return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export function useAppContext() {
	const context = useContext(AppContext)

	if (!context) {
		console.error('Error deploying App Context!!!')
	}

	return context
}

export default useAppContext
