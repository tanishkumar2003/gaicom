import { useId } from 'react';

export default function FormInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  className = '',
  textarea = false,
  rows = 4,
}) {
  const id = useId();

  const inputClasses =
    'w-full bg-surface-light border rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ' +
    (error ? 'border-red-500' : 'border-white/10 hover:border-white/20');

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-300">
          {label}
          {required && <span className="text-red-400 ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      {textarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={inputClasses}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={inputClasses}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="text-red-400 text-sm mt-0.5" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
