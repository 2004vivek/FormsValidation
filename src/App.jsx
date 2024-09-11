import React, { useState } from "react";
import { useForm } from "react-hook-form";

const PersonalDetails = ({ nextStep, setFormData, formData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formData,
  });

  const onSubmit = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Personal Details</h2>
      <div>
        <label>First Name</label>
        <input {...register("firstName", { required: "First Name is required" })} />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>
      <div>
        <label>Last Name</label>
        <input {...register("lastName", { required: "Last Name is required" })} />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <button type="submit">Next</button>
    </form>
  );
};

// Step 2: Address
const Address = ({ nextStep, prevStep, setFormData, formData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formData,
  });

  const onSubmit = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Address</h2>
      <div>
        <label>Street</label>
        <input {...register("street", { required: "Street is required" })} />
        {errors.street && <p>{errors.street.message}</p>}
      </div>
      <div>
        <label>City</label>
        <input {...register("city", { required: "City is required" })} />
        {errors.city && <p>{errors.city.message}</p>}
      </div>
      <div>
        <label>Zip Code</label>
        <input {...register("zipCode", { required: "Zip Code is required" })} />
        {errors.zipCode && <p>{errors.zipCode.message}</p>}
      </div>
      <button type="button" onClick={prevStep}>
        Back
      </button>
      <button type="submit">Next</button>
    </form>
  );
};

const PaymentDetails = ({ prevStep, nextStep, setFormData, formData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formData,
  });

  const onSubmit = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Payment Details</h2>
      <div>
        <label>Card Number</label>
        <input
          {...register("cardNumber", {
            required: "Card Number is required",
            pattern: {
              value: /^\d{16}$/,
              message: "Card Number must be 16 digits",
            },
          })}
        />
        {errors.cardNumber && <p>{errors.cardNumber.message}</p>}
      </div>
      <div>
        <label>Expiry Date</label>
        <input
          type="text"
          placeholder="MM/YY"
          {...register("expiryDate", {
            required: "Expiry Date is required",
            pattern: {
              value: /^(0[1-9]|1[0-2])\/\d{2}$/,
              message: "Invalid expiry date format",
            },
          })}
        />
        {errors.expiryDate && <p>{errors.expiryDate.message}</p>}
      </div>
      <div>
        <label>CVV</label>
        <input
          type="text"
          {...register("cvv", {
            required: "CVV is required",
            pattern: { value: /^[0-9]{3,4}$/, message: "CVV must be 3 or 4 digits" },
          })}
        />
        {errors.cvv && <p>{errors.cvv.message}</p>}
      </div>
      <button type="button" onClick={prevStep}>
        Back
      </button>
      <button type="submit">Next</button>
    </form>
  );
};

const Review = ({ formData, prevStep, submitForm }) => {
  return (
    <div>
      <h2>Review your details</h2>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      <button onClick={prevStep}>Back</button>
      <button onClick={submitForm}>Submit</button>
    </div>
  );
};

function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const submitForm = () => {
    alert("Form submitted successfully!\n\n" + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="App">
      <h1>Multi-Step Form</h1>
      {step === 0 && (
        <PersonalDetails nextStep={nextStep} setFormData={setFormData} formData={formData} />
      )}
      {step === 1 && (
        <Address nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} formData={formData} />
      )}
      {step === 2 && (
        <PaymentDetails nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} formData={formData} />
      )}
      {step === 3 && <Review formData={formData} prevStep={prevStep} submitForm={submitForm} />}
    </div>
  );
}

export default App;
