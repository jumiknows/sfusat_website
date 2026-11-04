import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom'; // Import the Link component for internal navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import SocialIcon from '../components/SocialIcon';
import { CONTACT_EMAIL, CONTACT_FORM_ACCESS_KEY, CONTACT_FORM_ENDPOINT, SOCIAL_LINKS } from '../content/contact';
import { recruitingSummary } from '../content/recruitment';
import './Contact.css'; // Import the CSS file for styling

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
};

const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  // Links such as /contact?subject=Sponsorship arrive with the subject filled in
  const [formData, setFormData] = useState({ ...EMPTY_FORM, subject: searchParams.get('subject') ?? '' });
  const [botcheck, setBotcheck] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const fullName = `${formData.firstName} ${formData.lastName}`.trim();

  // Keeps the visitor's message if delivery fails, so they never have to retype it.
  const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
    `${formData.message}\n\n${fullName}`
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!CONTACT_FORM_ACCESS_KEY) {
      window.location.href = mailtoLink;
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: CONTACT_FORM_ACCESS_KEY,
          subject: `[SFU SAT website] ${formData.subject}`,
          from_name: fullName,
          name: fullName,
          email: formData.email,
          message: formData.message,
          botcheck
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setFormData(EMPTY_FORM);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-intro">
        <h1>Contact Us</h1>
        <p>
          {recruitingSummary()} Please refer to our{' '}
          <Link to="/about" className="about-link">About page</Link> for more information on each team.
        </p>
        <ul className="contact-methods">
          <li>
            <FontAwesomeIcon icon={faEnvelope} />
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </li>
          {SOCIAL_LINKS.map((link) => (
            <li key={link.network}>
              <SocialIcon network={link.network} />
              <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label}>{link.handle}</a>
            </li>
          ))}
        </ul>
        <div className="contact-buttons">
          <Link to="/join" className="btn btn-solid">
            See open roles
          </Link>
          <Link to="/projects" className="btn btn-ghost">
            Our projects
          </Link>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="contact-form-section">
        <h2>Send us a message</h2>
        <p>Questions about our projects, research or team? Send us a message and we will get back to you.</p>

        <form
          onSubmit={handleSubmit}
          className="contact-form"
        >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name (required)</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email (required)</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject (required)</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message (required)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              required
            ></textarea>
          </div>

          {/* Spam trap: hidden from people, so only bots tick it */}
          <input
            type="checkbox"
            className="contact-botcheck"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            checked={botcheck}
            onChange={(e) => setBotcheck(e.target.checked)}
          />

          <div aria-live="polite">
            {submitStatus === 'success' && (
              <div className="status-message success">
                Thank you! Your message has been sent. We'll reply to the email address you provided.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="status-message error">
                Your message could not be sent. Please try again, or{' '}
                <a href={mailtoLink}>send it from your email app</a> to {CONTACT_EMAIL}.
              </div>
            )}
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'SENDING...' : 'SUBMIT'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
