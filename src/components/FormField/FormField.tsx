import { FC } from "react";

type Props = {
  name: string,
  label?: string,
}

export const FormField: FC<Props> = ({ name, label = name}) => {
  const isThe = ['Name', 'Email', 'Number'].includes(name);

  return (
    <div key={name}>
      <label htmlFor={name} className='label'>
        {label}
      </label>
      <input
        className='input'
        id={name}
        type='text'
        placeholder={`Enter${isThe ? ' the' : ''} ${name}`}
      />
    </div>
  );
}