import React, { useState } from 'react';
import Footer from './Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here, such as sending the data to a server or API
    console.log(formData);
    // Reset the form fields after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="container-fluid mb-2 ">
    <div className="container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Subject:</label>
          <input type="text" className="form-control" name="subject" value={formData.subject} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Message:</label>
          <textarea className="form-control" name="message" value={formData.message} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    <Footer />
    </div>
  );
};

export default ContactUs;

