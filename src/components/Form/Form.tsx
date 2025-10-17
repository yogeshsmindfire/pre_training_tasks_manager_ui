import React, { useState } from 'react';
import { Input, Checkbox, Button, Spinner } from '@fluentui/react-components';
import { useSelector } from 'react-redux';

import './Form.css';
import type { FormProps } from './Form.types';

const Form: React.FC<FormProps> = ({
  formConfig = [],
  handleSubmit,
  authError,
}) => {
  const isFetching = useSelector((state: { user?: { isFetching?: boolean } }) =>
    Boolean(state.user?.isFetching)
  );

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const verifyForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const newErrors: Record<string, string | undefined> = {};

    // Validate each configured field
    formConfig.forEach((field) => {
      const name = field.name ?? field.id;
      const el = form.elements.namedItem(name) as HTMLInputElement | null;

      const value = el
        ? el.type === 'checkbox'
          ? (el as HTMLInputElement).checked
            ? 'true'
            : ''
          : el.value
        : '';

      if (field.validation) {
        const re =
          typeof field.validation.pattern === 'string'
            ? new RegExp(field.validation.pattern)
            : field.validation.pattern;
        if (!re.test(value)) {
          newErrors[field.id] = field.error ?? field.validation.message;
        }
      }
    });

    setErrors(newErrors);

    // If no errors, submit
    if (Object.keys(newErrors).length === 0) {
      handleSubmit(form);
    }
  };

  return (
    <form onSubmit={verifyForm}>
      {formConfig.map((field) => {
        const key = field.id;
        const name = field.name ?? field.id;

        if (field.type === 'checkbox') {
          return (
            <div key={key} className="form-field">
              <Checkbox name={name} label={field.label} id={field.id} />
              {(errors[field.id] || field.error) && (
                <div role="alert" style={{ color: '#a80000', fontSize: 12 }}>
                  {errors[field.id] ?? field.error}
                </div>
              )}
            </div>
          );
        }

        return (
          <div key={key} className="form-field">
            <Input
              id={field.id}
              name={name}
              placeholder={field.placeholder ?? field.label}
              type={field.type}
              aria-invalid={!!field.error}
            />
            {(errors[field.id] || field.error) && (
              <div
                role="alert"
                className="form-field-error"
                style={{ color: 'rgb(225 86 86)', fontSize: '12px' }}
              >
                {errors[field.id] ?? field.error}
              </div>
            )}
          </div>
        );
      })}

      <div style={{ marginTop: 8 }}>
        {!isFetching && (
          <Button appearance="primary" type="submit">
            Submit
          </Button>
        )}
        {authError && (
          <div role="alert" style={{ color: '#a80000', fontSize: 12 }}>
            {authError}
          </div>
        )}
        {isFetching && <Spinner size="small" label="Processing..." />}
      </div>
    </form>
  );
};

export default Form;
