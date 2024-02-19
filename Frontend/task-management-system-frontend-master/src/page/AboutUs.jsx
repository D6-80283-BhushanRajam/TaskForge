import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  body: {
    margin: 0,
    fontFamily: 'Arial, sans-serif',
    
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover', 
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  aboutUsContainer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor:'	#F8F8F8',
    borderRadius: '10px',
    
    width: '80%', 
    maxWidth: '600px', 
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
  nav: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '5px',
    backgroundColor: '#4399e9',
    width: '100%',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '30px',
  },
  navLinksItem: {
    marginTop:'10px',
    fontFamily: "Comic Sans MS, Comic Sans, cursive",
    fontSize: '20px',
    color: 'white',
    alignItems: 'center',
    
  },
  navLinksLink: {
    textDecoration: 'underline',
    color: 'white',
  },
  aboutUsContent: {
    fontFamily: "Comic Sans MS, Comic Sans, cursive",
    marginTop: '30px',
    color: 'black',
  },
  teamList: {
    fontFamily: "Comic Sans MS, Comic Sans, cursive",
    listStyle: 'none',
    padding: 0,
    marginTop: '20px',
  },
  teamMember: {
    fontFamily: "Comic Sans MS, Comic Sans, cursive",
    marginBottom: '15px',
    padding: '15px',
    border: '1px solid #0E0E0C',
    borderRadius: '8px',
  },
  teamMemberName: {
    fontFamily: "Comic Sans MS, Comic Sans, cursive",
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  teamMemberRole: {
    fontFamily: "Times New Roman, Times, serif",
    fontSize: '16px',
    color: '#555',
  }
  
};
const AboutUs = () => {
  return (<div className='d-flex justify-content-center align-items-center vh-100 loginPage '>
  <div style={styles.body}>
  
 
          
    <div style={styles.aboutUsContainer}>
    
      <header>
        <nav style={styles.nav}>
          <ul style={styles.navLinks} className="nav-links">
            <li style={styles.navLinksItem}><Link style={styles.navLinksLink} to="/">Home</Link></li>
           
          </ul>
        </nav>
      </header>
      
      <section style={styles.aboutUsContent} className="about-us-content">
      
        <h1>About Us</h1>

        <p>We are a team of dedicated developers passionate about creating innovative solutions.</p>

        <h2>Meet the Team:</h2>
        <ul style={styles.teamList}>
          <li style={styles.teamMember}>
            <div style={styles.teamMemberName}><h5>Sushil Samant</h5>
            <h5>Bhushan Rajam</h5></div>
            <div style={styles.teamMemberRole}>Frontend Developer</div>
          </li>
          <li style={styles.teamMember}>
            <div style={styles.teamMemberName}><h5>Vaibhav Tade</h5>
            <h5>Rahul Neekhare</h5></div>
            <div style={styles.teamMemberRole}>Backend Developer</div>
          </li>
       
        </ul>

        <p>Feel free to contact us if you have any questions or feedback.</p>
      </section>

     
    </div>
    
  </div>

  </div>

  );
};

export default AboutUs;
