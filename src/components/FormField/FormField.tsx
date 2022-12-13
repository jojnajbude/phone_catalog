import classNames from "classnames";
import { FC, useState } from "react";
import { isatty } from "tty";
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

  const [count, setCount] = useState(
    isArray
      ? (value.length ? value.length : 1)
      : -1);

  return (
    <div key={name} className="mb-2">
      <label htmlFor={name} className='label mb-1'>
        {label}
      </label>
      {!isArray && (
          <input
            className='input'
            id={name}
            type='text'
            placeholder={`Enter${isThe ? ' the' : ''} ${label}`}
            value={value}
            onChange={(event) => {
              onChange(name, event.currentTarget.value);
            }}
          />
        )
      }

      {isArray && (
        <div className={classNames(
          'is-flex',
          {
            'is-flex-direction-column': count > 1,
          }
        )}>
          <div className={classNames(
            'is-flex-grow-2',
            {
              'mr-2': count === 1,
            },
          )}>
            {Array(count).fill(null).map((_, i) => (
              <input
                key={i * Math.random()}
                className='input mb-2'
                id={name}
                type='text'
                placeholder={`Enter${isThe ? ' the' : ''} ${label}`}
                value={value[i]}
                onChange={(event) => {
                  onChange(name, event.currentTarget.value);
                }}
              />
            ))}
          </div>

          <button
            className={classNames(
              'button is-info',
              {
                'is-align-self-flex-end': count > 1
              }
            )}
            style={{ width: 'min-content'}}
            onClick={() => {
              setCount(curr => curr + 1);

              console.log(count);
            }}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}