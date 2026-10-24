import { ChevronDown } from "lucide-react";

const Select = ({
    label,
    name,
    value,
    onChange,
    options = [],
    placeholder = "Select an option",
    error,
    required = false,
    disabled = false,
    className = "",
    ...props
}) => {
    const inputId = props.id || name;

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-slate-700">
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                <select
                    id={inputId}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${inputId}-error` : undefined}
                    className={`w-full appearance-none rounded-lg border bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:ring-2 disabled:bg-slate-100 ${error
                            ? "border-red-400 focus:ring-red-100"
                            : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
                        } ${className}`}
                    {...props}
                >
                    <option value="">{placeholder}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
            </div>
            {error && (
                <p id={`${inputId}-error`} className="mt-1 text-xs text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Select;