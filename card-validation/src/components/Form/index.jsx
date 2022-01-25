import React from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './index.scss';

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('required'),
  cardnumber: Yup.string()
    .min(16, 'too short!')
    .required('required'),
  expireMM: Yup.string().required('required'),
  expireYY: Yup.string().required('required'),
  securitycode: Yup.string().min(3).max(3).required('required'),
});


export default function CardForm() {
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
       onSubmit={(values) => {
         console.log(values);
       }}
     >
       {({ errors, touched}) => (
         <Form>
          <form className="form">
            <div className="field">
              <label htmlFor="name" className="field__label">Name</label>
              <Field name="name" type="text" className="field__input"/>
              {errors.name && touched.name ? (
                  <span className="field__error">{errors.name}</span>
                ) : null}
            </div>
            <div className="field">
              <label htmlFor="cardnumber" className="field__label">Card Number</label>
              <Field name="cardnumber" type="text" className="field__input"/>
              {errors.cardnumber && touched.cardnumber ? (
                  <span className="field__error">{errors.cardnumber}</span>
                ) : null}
            </div>
            <div className="field">
                <label htmlFor="expirationdate" className="field__label">Expiration (mm/yy)</label>
                <div className="field__container">

                
                <div className="field__container__content">
                <Field as="select" name='expireMM' className="field__select">
                  <option value=''>Month</option>
                  <option value='01'>January</option>
                  <option value='02'>February</option>
                  <option value='03'>March</option>
                  <option value='04'>April</option>
                  <option value='05'>May</option>
                  <option value='06'>June</option>
                  <option value='07'>July</option>
                  <option value='08'>August</option>
                  <option value='09'>September</option>
                  <option value='10'>October</option>
                  <option value='11'>November</option>
                  <option value='12'>December</option>
                </Field>
                {errors.expireMM && touched.expireMM ? (
                  <span className="field__error--inline">{errors.expireMM}</span>
                ) : null} 
                </div>
                <div className="field__container__content">
                <Field as="select" name='expireYY' className="field__select">
                    <option value=''>Year</option>
                    <option value='20'>2022</option>
                    <option value='21'>2023</option>
                    <option value='22'>2024</option>
                    <option value='23'>2025</option>
                    <option value='24'>2026</option>
                </Field> 
                {errors.expireYY && touched.expireYY ? (
                  <span className="field__error--inline">{errors.expireYY}</span>
                ) : null} 
                </div>
                </div>
            </div>
            <div className="field">
                <label htmlFor="securitycode" className="field__label">Security Code</label>
                <Field name="securitycode" type="text" className="field__input"/>
                {errors.securitycode && touched.securitycode ? (
                  <span className="field__error">{errors.securitycode}</span>
                ) : null} 
            </div>
            <div className="field">
              <button type="submit" className="field__input--submit">Submit</button>
            </div>
          </form>
        </Form>
       )}
        

    </Formik>
  )
}