import { FC } from "react";
import { Contact } from "../../types/Contact";

type Props = {
  name: string,
  label?: string,
  value: any,
  onChange: (field: any, value: any) => void,
}

export const FormField: FC<Props> = ({
  name,
  label = name,
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
            value={value}
            onChange={(event) => {
              console.log(event.currentTarget.value, value);
              onChange(name, event.currentTarget.value);
            }}
          />
        )
      : !value.length
          ? (
            <input
              className='input'
              id={name}
              type='text'
              placeholder={`Enter${isThe ? ' the' : ''} ${name}`}
              // onChange={() => {}}
              // value={value}
            />
          )
          : value.map(() => <></>)
      }
    </div>
  );
}