import React, { useRef, useState } from 'react';
import '../assets/styles/Contact.scss';
// import emailjs from '@emailjs/browser';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { useLanguage } from '../context/LanguageContext';

function Contact() {

  const { t } = useLanguage();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);

  const form = useRef();

  const sendEmail = (e: any) => {
    e.preventDefault();

    setNameError(name === '');
    setEmailError(email === '');
    setMessageError(message === '');

    /* Uncomment below if you want to enable the emailJS */

    // if (name !== '' && email !== '' && message !== '') {
    //   var templateParams = {
    //     name: name,
    //     email: email,
    //     message: message
    //   };

    //   console.log(templateParams);
    //   emailjs.send('service_id', 'template_id', templateParams, 'api_key').then(
    //     (response) => {
    //       console.log('SUCCESS!', response.status, response.text);
    //     },
    //     (error) => {
    //       console.log('FAILED...', error);
    //     },
    //   );
    //   setName('');
    //   setEmail('');
    //   setMessage('');
    // }
  };

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <div className="contact-head">
            <span className="contact-eyebrow">{t.contact.eyebrow}</span>
            <h1>{t.contact.titleMain} <span className="contact-outline">{t.contact.titleOutline}</span></h1>
            <span className="contact-rule"></span>
            <p className="contact-intro">{t.contact.intro}</p>
          </div>
          <Box
            ref={form}
            component="form"
            noValidate
            autoComplete="off"
            className='contact-form'
          >
            <div className='form-flex'>
              <TextField
                required
                id="outlined-required"
                label={t.contact.nameLabel}
                placeholder={t.contact.namePlaceholder}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                error={nameError}
                helperText={nameError ? t.contact.nameError : ""}
              />
              <TextField
                required
                id="outlined-required"
                label={t.contact.emailLabel}
                placeholder={t.contact.emailPlaceholder}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                error={emailError}
                helperText={emailError ? t.contact.emailError : ""}
              />
            </div>
            <TextField
              required
              id="outlined-multiline-static"
              label={t.contact.messageLabel}
              placeholder={t.contact.messagePlaceholder}
              multiline
              rows={10}
              className="body-form"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              error={messageError}
              helperText={messageError ? t.contact.messageError : ""}
            />
            <Button variant="contained" endIcon={<SendIcon />} onClick={sendEmail}>
              {t.contact.send}
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Contact;