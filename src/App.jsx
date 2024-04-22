import React, { useState, useEffect } from 'react';

export function App(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateValues = () => {
    let errors = {};
    if (name.length < 2) {
      errors.name = "Name is too short";
    }
    if (!String(email).toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      errors.email = "Invalid Email";
    }
    let re =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,}$/;
    if( !re.test(password) ){
      errors.password = 'Invalid password';
    }

    let today = new Date(),
    birthDate = new Date(dob),
    age = today.getFullYear() - birthDate.getFullYear(),
    m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (!dob || age < 21) {
      errors.dob = "Minimum age is 21";
    }
    return errors;
  };

  const finishSubmit = () => {
    alert('Form submitted!');
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateValues());
    setSubmitting(true);
  };


  return (
    <form data-testid="form-id" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input data-testid="input-name" type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} style={{ border: errors.name ? "1px solid red" : null }}
      />
      {errors.name ? (
            <p data-testid="error-name" className="error">The name field is required and must be at least 2 characters long</p>
          ) : null}
      <br />
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      {errors.email ? (
            <p className="error">The email address field is required and must be a valid email address</p>
          ) : null}
      <br />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {errors.password ? (
            <p className="error">The password is required and must be at least 8 characters long, contain at least one special character, at least one number and one lowercase letter and an uppercase letter</p>
          ) : null}
      <br />
      <label htmlFor="dob">Date of birth:</label>
      <input type="date" id="dob" name="dob" value={dob} onChange={(e) => setDob(e.target.value)} />
      {errors.dob ? (
            <p className="error">We require the person filling out the form to be at least 21</p>
          ) : null}
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
}