import classNames from "classnames";
import { FC, useState } from "react";
import { Email } from "../../types/Email";
import { Number } from "../../types/Number";

type Props = {
  name: string,
  label?: string,
  value: Email[] | Number[],
  onChange: (field: string, id: number, newValue: any) => void,
  toRemove: (field: any, value: any) => void,
  type?: string,
  require?: boolean
}

export const FormFieldArray: FC<Props> = ({
  name,
  label = name,
  value,
  onChange,
  toRemove,
  type = 'text',
  require = false
}) => {
  const isThe = ['Name', 'Email', 'Number'].includes(name);

  const [count, setCount] = useState(value.length);
  const [touchedIds, setTouchedIds] = useState<number[]>([]);

  const hasError = value
    .some(item => !item.value
      && touchedIds.includes(item.id));

  const hasEmailError = name === 'email' && value
    .some(item => touchedIds.includes(item.id)
    && !/[\d\w]+@[a-z]+\.[a-z]+/.test(item.value));

  const hasPhoneError = name === 'number' && value
    .some(item => touchedIds.includes(item.id)
    && !/^\+?\d+$/.test(item.value));

  const addNewField = () => {
    const id = Math.max(...value.map(field => +field.id)) + 1;

    value.push({
      id: id,
      value: '',
    });

    setCount(value.length);
  };

  const removeField = (id: number) => {
    toRemove(name, value.filter(item => item.id !== id));

    setCount(curr => curr - 1);
  };
  
  return (
    <div key={name} className="mb-2">
      <label className='label mb-1'>
        {label} {(hasError || hasEmailError || hasPhoneError) && (
          <span className="has-text-danger is-size-7">
            Invalid value
          </span>
        )}
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
          {value.map(({ id, value }, i) => (
            <div
              key={id}
              className="is-flex is-align-items-center mb-2"
            >
              <input
                className={classNames(
                  'input mr-2',
                  {
                    'is-danger': touchedIds.includes(id) && !value,
                  },
                )}
                type={type}
                placeholder={`Enter${isThe ? ' the' : ''} ${label}`}
                value={value}
                onChange={(event) => {
                  onChange(name, id ,event.target.value);
                  setCount(curr => curr);
                }}
                onBlur={() => setTouchedIds(curr => [...curr, id])}
              />

              {count > 1 && (
                <button
                  className="delete"
                  onClick={() => removeField(id)}
                />
              )}
            </div>
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