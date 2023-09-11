import React from 'react'

export default function CalenderInputYear({ name, label, placeholder,
    onChange,
    onBlur,
    value,
    type,
    touched,
    errors }) {
    return (
        <div className="flex flex-col justify-between w-full mb-6 space-y-2 md:w-[30%]">
            <label htmlFor={label} className="font-semibold">
                {label}
            </label>
            <input
                type={type}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder={placeholder}
                className="p-3 placeholder-gray-500 border border-gray-400 border-solid rounded hover:border-blue-500 hover:bg-blue-100 focus:outline-none focus:ring focus:ring-blue-200"
                id="Year"

            />
            {touched[name] && errors[name] && <div className="text-sm text-red-700">{errors[name]}</div>}

        </div>
    )
}
