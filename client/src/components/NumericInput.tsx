import React, { useState } from "react";
import { Input } from "@/components/ui/input";

interface NumericInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange: (value: number | undefined) => void;
  prefix?: string;
  initiallyTouched?: boolean;
}

export const NumericInput: React.FC<NumericInputProps> = ({
  onValueChange,
  prefix,
  initiallyTouched = false,
  value,
  placeholder,
  className,
  ...props
}) => {
  const [touched, setTouched] = useState(initiallyTouched);
  const [inputValue, setInputValue] = useState(value?.toString() || "");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Só atualiza o valor para o componente pai se o campo já foi tocado
    // ou se o valor não estiver vazio
    if (touched || newValue !== "") {
      const numericValue = newValue === "" ? undefined : Number(newValue);
      onValueChange(numericValue);
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    if (props.onBlur) {
      props.onBlur(e);
    }
    
    // Garantir que o valor numérico seja atualizado no blur
    const numericValue = inputValue === "" ? undefined : Number(inputValue);
    onValueChange(numericValue);
  };
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!touched) {
      setTouched(true);
    }
    
    if (props.onFocus) {
      props.onFocus(e);
    }
  };
  
  return (
    <div className="relative">
      {prefix && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{prefix}</span>
        </div>
      )}
      <Input
        type="number"
        value={inputValue}
        placeholder={placeholder as string}
        className={`${prefix ? 'pl-10' : ''} ${className || ''}`}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...props}
      />
    </div>
  );
};