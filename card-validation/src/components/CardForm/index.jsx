import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Card from '../Card';
import months from '../../constants/months';
import years from '../../constants/years';

import './index.scss';


const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^((?:[A-Za-z]+ ?){1,3})$/, 'enter a valid name')
    .required('required'),
  cardnumber: Yup.string()
    .matches(/^4[0-9]{12}(?:[0-9]{3})?$/, 'enter a valid card number')
    .required('required'),
  expireMM: Yup.string().required('required'),
  expireYY: Yup.string().required('required'),
  securitycode: Yup.string()
    .min(3, 'too short')
    .max(4, 'too long')
    .required('required'),
});

const initialValues = {
  name: '',
  cardnumber: '',
  expireMM: '',
  expireYY: '',
  securitycode: '',
};

export default function CardForm({ onSubmit }) {
  const [side, setSide] = useState('front');

  const handleSubmit = (values) => {
    console.log('values', values);
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={handleSubmit}
      data-testid="form"
    >
      {({ errors, touched, values }) => (
        <Form className="form">
          <Card values={values} side={side} />
          <div className="field">
            <label htmlFor="name" className="field__label">
              Name
            </label>
            <Field
              name="name"
              aria-label="name"
              type="text"
              className="field__input"
              onClick={() => setSide('front')}
            />
            {errors.name && touched.name ? (
              <span className="field__error">{errors.name}</span>
            ) : null}
          </div>
          <div className="field">
            <label htmlFor="cardnumber" className="field__label">
              Card Number
            </label>
            <Field
              name="cardnumber"
              aria-label="cardnumber"
              type="text"
              className="field__input"
              onClick={() => setSide('front')}
            />
            {errors.cardnumber && touched.cardnumber ? (
              <span className="field__error">{errors.cardnumber}</span>
            ) : null}
          </div>
          <div className="field">
            <label htmlFor="expirationdate" className="field__label">
              Expiration (mm/yy)
            </label>
            <div className="field__container">
              <div className="field__container__content">
                <Field
                  as="select"
                  name="expireMM"
                  aria-label="expireMM"
                  className="field__select"
                  onClick={() => setSide('front')}
                >
                  <option value="">Month</option>
                  {months.map((el) => (
                    <option value={el.value} key={el.value}>
                      {el.name}
                    </option>
                  ))}
                </Field>
                {errors.expireMM && touched.expireMM ? (
                  <span className="field__error">{errors.expireMM}</span>
                ) : null}
              </div>
              <div className="field__container__content">
                <Field
                  as="select"
                  name="expireYY"
                  aria-label="expireYY"
                  className="field__select"
                  onClick={() => setSide('front')}
                >
                  <option value="">Year</option>
                  {years.map((el) => (
                    <option value={el.value} key={el.value}>
                      {el.name}
                    </option>
                  ))}
                </Field>
                {errors.expireYY && touched.expireYY ? (
                  <span className="field__error">{errors.expireYY}</span>
                ) : null}
              </div>
            </div>
          </div>
          <div className="field">
            <label htmlFor="securitycode" className="field__label">
              Security Code
            </label>
            <Field
              name="securitycode"
              aria-label="securitycode"
              type="text"
              className="field__input"
              onClick={() => setSide('back')}
            />
            {errors.securitycode && touched.securitycode ? (
              <span className="field__error">{errors.securitycode}</span>
            ) : null}
          </div>
          <div className="field">
            <button
              //onClick={handleSubmit}
              type="submit"
              className="field__input--submit"
              data-testid="button"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
