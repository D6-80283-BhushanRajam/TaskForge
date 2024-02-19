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


// const ContactUs = () => {
//   return (
//     <div className="text-color ms-5 me-5 mr-5 mt-3">
//       <b>
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
//         mollitia, molestiae quas vel sint commodi repudiandae consequuntur
//         voluptatum laborum numquam blanditiis harum quisquam eius sed odit
//         fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
//         accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
//         molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
//         officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
//         nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque
//         error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis
//         modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias
//         error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt
//         dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed
//         amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat,
//         temporibus enim commodi iusto libero magni deleniti quod quam
//         consequuntur! Commodi minima excepturi repudiandae velit hic maxime
//         doloremque. Quaerat provident commodi consectetur veniam similique ad
//         earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
//         fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores
//         labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto
//         ab laudantium modi minima sunt esse temporibus sint culpa, recusandae
//         aliquam numquam totam ratione voluptas quod exercitationem fuga.
//         Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!
//         1427 lorem ipsumWhatever By Shadow on Mar 26 2022 DonateThankComment
//         <br />
//         <br />
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
//         mollitia, molestiae quas vel sint commodi repudiandae consequuntur
//         voluptatum laborum numquam blanditiis harum quisquam eius sed odit
//         fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
//         accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
//         molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
//         officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
//         nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque
//         error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis
//         modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias
//         error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt
//         dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed
//         amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat,
//         temporibus enim commodi iusto libero magni deleniti quod quam
//         consequuntur! Commodi minima excepturi repudiandae velit hic maxime
//         doloremque. Quaerat provident commodi consectetur veniam similique ad
//         earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
//         fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores
//         labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto
//         ab laudantium modi minima sunt esse temporibus sint culpa, recusandae
//         aliquam numquam totam ratione voluptas quod exercitationem fuga.
//         Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!
//         1427 lorem ipsumWhatever By Shadow on Mar 26 2022 DonateThankComment
//       </b>
//     </div>
//   );
// };

// export default ContactUs;
