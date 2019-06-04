import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField/';
import NumberFormat, { NumberFormatProps } from 'react-number-format';

interface MoneyMaterialInputFormatProps {
  propsTextField: TextFieldProps,
  propsNumberFormat: NumberFormatProps,
}

function NumberMaterialInputFormat({ propsTextField, propsNumberFormat }: MoneyMaterialInputFormatProps) {
  // @ts-ignore
  return <NumberFormat
           customInput={TextField}
           isAllowed={({floatValue, formattedValue}: { floatValue: number, formattedValue: string }) => {
             const MAX_INTEGER = 9007199254740991;
             return !!floatValue && floatValue <= MAX_INTEGER;
           }}
           
           {...propsTextField}
           {...propsNumberFormat}
  />
}

export default NumberMaterialInputFormat;