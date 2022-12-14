import classNames from "classnames";
import { FC, useState } from "react";
import { Email } from "../../types/Email";
import { Number } from "../../types/Number";

type Props = {
  name: string,
  label?: string,
  value: Email[] | Number[],
  onChange: (field: string, id: number, newValue: any) => void,
  type?: string,
}

export const FormFieldArray: FC<Props> = ({
  name,
  label = name,
  value,
  onChange,
  type = 'text',
}) => {
  const isThe = ['Name', 'Email', 'Number'].includes(name);

  const [count, setCount] = useState(value.length);

  const addNewField = () => {
    const id = Math.max(...value.map(field => +field.id)) + 1;

    value.push({
      id: id,
      value: '',
    });

    console.log(value);

    setCount(curr => curr + 1);
  };
  
  return (
    <div key={name} className="mb-2">
      <label className='label mb-1'>
        {label}
      </label>
      
      <div className={classNames(
        'is-flex',
        {
          'is-flex-direction-column': value.length > 1,
        }
      )}>
        <div className={classNames(
          'is-flex-grow-2',
          {
            'mr-2': value.length === 1,
          },
        )}>
          {value.map((_, i) => (
            <input
              key={i * Math.random()}
              className='input mb-2'
              id={String(value[i].id)}
              type={type}
              placeholder={`Enter${isThe ? ' the' : ''} ${label}`}
              value={value[i].value}
              onChange={(event) => {
                onChange(name, value[i].id ,event.currentTarget.value);
              }}
            />
          ))}
        </div>

        <button
          className={classNames(
            'button is-info',
            {
              'is-align-self-flex-end': value.length > 1
            }
          )}
          style={{ width: 'min-content'}}
          onClick={() => count < 3 && addNewField()}
          disabled={count >= 3}
        >
          Add
        </button>
      </div>
    </div>
  );
}

//