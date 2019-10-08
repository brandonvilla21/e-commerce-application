import { useState } from "react";

function useInput(name: string, initialState: string = '', inputProps: any = {}) {
  const [input, setInput] = useState(initialState)  
  
  return {
    onChange: (event: any) => setInput(event.target.value),
    value: input,
    label: name.slice(0, 1).toUpperCase() + name.slice(1),
    ...inputProps
  }
}

export default useInput