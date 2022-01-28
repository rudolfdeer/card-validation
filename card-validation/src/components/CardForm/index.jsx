import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Card from '../Card';
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

export default function CardForm({ onSubmit }) {
  const [side, setSide] = useState('front');

  const handleSubmit = (values) => {
    console.log('values', values);
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={{
        name: '',
        cardnumber: '',
        expireMM: '',
        expireYY: '',
        securitycode: '',
      }}
      validationSchema={ValidationSchema}
      onSubmit={onSubmit}
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
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
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
                  <option value="22">2022</option>
                  <option value="23">2023</option>
                  <option value="24">2024</option>
                  <option value="25">2025</option>
                  <option value="26">2026</option>
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
              // onClick={handleSubmit}
              type="submit"
              className="field__input--submit"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
