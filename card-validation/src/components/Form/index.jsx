import React from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import './index.scss';

// const ValidationSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Required'),
//   number: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Required'),
//   month: Yup.string().email('Invalid email').required('Required'),
//   year: Yup.string().email('Invalid email').required('Required'),
//   cvc: Yup.string().email('Invalid email').required('Required'),
// });


export default function Form() {
  return (
    <Formik
       initialValues={{
         name: '',
         number: '',
         month: '',
         year: '',
         cvc: '',
       }}
       //validationSchema={ValidationSchema}
       onSubmit={(values) => {
         console.log(values);
       }}
     >
         <form className="form">
      <div className="field">
        <label htmlFor="name" className="field__label">Name</label>
        <input id="name" type="text" className="field__input"/>
      </div>
      <div className="field">
        <label htmlFor="cardnumber" className="field__label">Card Number</label>
        <input id="cardnumber" type="text" className="field__input"/>
      </div>
      <div className="field">
          <label htmlFor="expirationdate" className="field__label">Expiration (mm/yy)</label>
          <select name='expireMM' id='expireMM' className="field__select">
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
          </select> 
          <select name='expireYY' id='expireYY' className="field__select">
              <option value=''>Year</option>
              <option value='20'>2022</option>
              <option value='21'>2023</option>
              <option value='22'>2024</option>
              <option value='23'>2025</option>
              <option value='24'>2026</option>
          </select> 
      </div>
      <div className="field">
          <label htmlFor="securitycode" className="field__label">Security Code</label>
          <input id="securitycode" type="text" className="field__input"/>
      </div>
      <div className="field">
        <input type="submit" className="field__input--submit" name = "Submit"/>
      </div>
    </form>

    </Formik>
  )
}