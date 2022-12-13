import { FC } from "react";

type Props = {
  name: string,
  label?: string,
  value: any,
  onChange: (field: any, value: any) => void,
}

export const FormField: FC<Props> = ({
  name,
  label,
  value,
  onChange,
}) => {
  const isArray = Array.isArray(value);
  const isThe = !isArray && ['Name', 'Email', 'Number'].includes(name);

  return (
    <div key={name}>
      <label htmlFor={name} className='label'>
        {label}
      </label>
      {!isArray
        ? (
          <input
            className='input'
            id={name}
            type='text'
            placeholder={`Enter${isThe ? ' the' : ''} ${label}`}
            onChange={() => onChange(name, value)}
            value={value}
          />
        )
      : !value.length
          ? (
            <input
              className='input'
              id={name}
              type='text'
              placeholder={`Enter${isThe ? ' the' : ''} ${name}`}
              onChange={() => onChange(name, value)}
              value={value}
            />
          )
          : value.map(() => <></>)
      }
    </div>
  );
}