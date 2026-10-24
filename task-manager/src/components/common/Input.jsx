import { forwardRef } from "react";

const Input = forwardRef(
    (
        {
            label,
            name,
            type = "text",
            placeholder,
            value,
            onChange,
            error,
            icon: Icon,
            required = false,
            disabled = false,
            className = "",
            ...props
        },
        ref
    ) => {
        const inputId = props.id || name;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        {label}
                        {required && <span className="ml-1 text-red-500">*</span>}
                    </label>
                )}

                <div className="relative">
                    {Icon && (
                        <Icon
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        name={name}
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={required}
                        disabled={disabled}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${inputId}-error` : undefined}
                        className={`w-full rounded-lg border bg-white py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 ${Icon ? "pl-10 pr-4" : "px-4"
                            } ${error
                                ? "border-red-400 focus:ring-red-100"
                                : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
                            } ${className}`}
                        {...props}
                    />
                </div>

                {error && (
                    <p id={`${inputId}-error`} className="mt-1 text-xs text-red-600">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;