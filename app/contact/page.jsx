"use client";

import { useEffect, useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [showContact, setShowContact] = useState(false); // State สำหรับการแสดงหน้า Contact

    useEffect(() => {
        const timer = setTimeout(() => setShowContact(true), 800); // 
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className={`container  mx-auto py-12 pt-[100px] bg-white shadow-md rounded-lg p-6 transition-opacity duration-500 ${showContact ? "opacity-100" : "opacity-0"}`}>
            <h2 className="text-3xl mb-6 text-center tracking-wide mt-[30px] text-gray-800">Contact Us</h2>
            {submitted && <p className="text-green-500 text-center mb-4">Your message has been sent!</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700" htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border text-black/70 border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-black/70 text-gray-700" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border text-black/70 border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-black/70 text-gray-700" htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 text-black/70 rounded-md p-2"
                        rows="4"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-300"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default Contact;
