import { useState } from 'react';

function useHandleChange<T>(initialState: T) {

  const [values, setValues] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  return {
    handleChange,
    values,
  }
};

export default useHandleChange;