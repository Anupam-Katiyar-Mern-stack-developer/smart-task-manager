const Textarea = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    rows = 4,
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
            <textarea
                id={inputId}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                required={required}
                disabled={disabled}
                aria-invalid={!!error}
                aria-describedby={error ? `${inputId}-error` : undefined}
                className={`w-full resize-y rounded-lg border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 disabled:bg-slate-100 ${error
                        ? "border-red-400 focus:ring-red-100"
                        : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
                    } ${className}`}
                {...props}
            />
            {error && (
                <p id={`${inputId}-error`} className="mt-1 text-xs text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Textarea;