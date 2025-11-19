import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { Mail, Phone, MapPin, Youtube, Twitch, Linkedin, Github, Instagram } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

// ========================================
// Contact.jsx
// ========================================
// Displays the "Contact Me" section with a working Formspree form,
// social media links, and contact information cards.
// Includes Framer Motion animations for smooth interactions
// and a custom ScrollReveal component for fade-in effects.
// ========================================

const Contact = () => {
    // initialize 'Formspree' form hook
    const [state, handleSubmit] = useForm("xanawbgy");

    // contact details displayed on the right side card
    const contactInfo = [
    { icon: <Mail size={20} />, label: 'Email', value: 'lubih1@myumanitoba.ca' },
    { icon: <Phone size={20} />, label: 'Phone', value: '(204) 588-8180' },
    { icon: <MapPin size={20} />, label: 'Location', value: 'Winnipeg, Canada' }
    ];

    // social media links displayed as icons below contact info
    const socialLinks = [
    { href: "https://youtube.com/@platapus9", icon: <Youtube size={20} />, title: "YouTube" },
    { href: "https://twitch.tv/platapuss", icon: <Twitch size={20} />, title: "Twitch" },
    { href: "https://linkedin.com/in/hector-lubi", icon: <Linkedin size={20} />, title: "LinkedIn" },
    { href: "https://github.com/hectorlubi", icon: <Github size={20} />, title: "GitHub" },
    { href: "https://instagram.com/hector_lubi", icon: <Instagram size={20} />, title: "Instagram" }
    ];

    return (
        <section className="contact" id="contact">
            <div className="container">

                {/* Section Title */}
                <ScrollReveal>
                    <h2 className="section-title">Contact Me</h2>
                    <p className='contact-subtitle'>
                        Any Questions? Feel free to ask!
                    </p>
                </ScrollReveal>
            
                <div className="contact-container">

                    {/* Contact Form Section */}
                    <ScrollReveal delay={0.2}>
                        <div className="contact-form">
                            <h3>Send Me a Message!</h3>

                            {/* Show success message after successful submission */}
                            {state.succeeded ? (
                                <div className="success-message">
                                    <p>Thank you for your message! I will get back to you soon.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>

                                    {/* Name Field */}
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id="name" name="name" required />
                                        <ValidationError prefix="Name" field="name" errors={state.errors} />
                                    </div>

                                    {/* Email Field */}
                                    <div className="form-group">
                                        <label htmlFor="email">E-mail</label>
                                        <input type="email" id="email" name="email" required />
                                        <ValidationError prefix="Email" field="email" errors={state.errors} />
                                    </div>

                                    {/* Reason Dropdown */}
                                    <div className="form-group">
                                        <label htmlFor="reason">Reason for Contact</label>
                                        <select id="reason" name="reason" required >
                                            <option value="">Select a reason...</option>
                                            <option value="project">Project Inquiry</option>
                                            <option value="collaboration">Collaboration</option>
                                            <option value="job">Job Opportunity</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <ValidationError prefix="Reason" field="reason" errors={state.errors} />
                                    </div>

                                    {/* Message Field */}
                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea id="message" name="message" required />
                                        <ValidationError prefix="Message" field="message" errors={state.errors} />
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button 
                                        type="submit" 
                                        className="submit-btn"
                                        disabled={state.submitting}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {state.submitting ? 'Sending...' : 'Send Message'}
                                    </motion.button>
                                </form>
                            )}
                        </div>
                    </ScrollReveal>

                    {/* Contact Info and Social Links Section */}
                    <ScrollReveal delay={0.3}>
                        <div className="contact-info-card">
                            <h3>Contact Information</h3>
                        
                            {/* Contact Details (email, phone, location) */}
                            {contactInfo.map((item, index) => (
                                <motion.div 
                                    className="contact-item" 
                                    key={index}
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="contact-item-icon"> {item.icon} </div>
                                    <div>
                                        <strong>{item.label}</strong><br />
                                        {item.value}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Social Media Links */}
                            <div className="contact-socials">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-icon"
                                        title={social.title}
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>

                            {/* Copyright */}
                            <div className="copyright">
                                <p>© 2025 Hector Lubi. All Rights Reserved.</p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default Contact;