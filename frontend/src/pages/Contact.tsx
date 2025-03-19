import { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    console.log("Form submitted:", formData);

    setSubmitted(true);
 
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
  
      <div data-aos="zoom-in" className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-medium text-gray-500">Contact <span className="font-medium text-[#E8C2A5]">Us</span></h2>
        <div className="w-24 h-0.5 bg-[#E8C2A5] mt-2"></div>
        <p className="text-gray-600 mt-4 text-center max-w-2xl">
          Have questions about our products, need help with an order, or just want to say hello? We're here to help!
        </p>
      </div>

 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        <div data-aos="zoom-in-right" className="bg-[#F8F2EE]/80 p-8 rounded-xl border-[#F8F2EE]/50">
          <h2 className="text-xl font-medium text-gray-600 mb-6">Get in Touch</h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-[#e8c2a580] rounded-full flex items-center justify-center flex-shrink-0">
                <img src={assets.map || "/icons/location.svg"} alt="Address" className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-gray-600 font-medium">Visit Us</h3>
                <p className="text-gray-500">123 Teddy Bear Lane<br />Galle, B 12345<br />Sri Lanka</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-[#e8c2a580] rounded-full flex items-center justify-center flex-shrink-0">
                <img src={assets.call || "/icons/phone.svg"} alt="Phone" className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-gray-600 font-medium">Call Us</h3>
                <p className="text-gray-500">(555) 123-4567</p>
                <p className="text-gray-500">Mon-Fri: 9am - 6pm EST</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-[#e8c2a580] rounded-full flex items-center justify-center flex-shrink-0">
                <img src={assets.email || "/icons/email.svg"} alt="Email" className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-gray-600 font-medium">Email Us</h3>
                <p className="text-gray-500">hello@teddytoyshop.com</p>
                <p className="text-gray-500">orders@teddytoyshop.com</p>
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-medium text-gray-600/80 mt-12 mb-6">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 bg-[#e8c2a580] rounded-full flex items-center justify-center hover:bg-[#E8C2A5] transition">
              <img src={assets.facebook_icon || "/"} alt="Facebook" className="w-4/6 " />
            </a>
            <a href="#" className="w-10 h-10 bg-[#e8c2a580] rounded-full flex items-center justify-center hover:bg-[#E8C2A5] transition">
              <img src={assets.instagram_icon || "/"} alt="Instagram" className="w-4/6 h-auto" />
            </a>
            <a href="#" className="w-10 h-10 bg-[#e8c2a580] rounded-full flex items-center justify-center hover:bg-[#E8C2A5] transition">
              <img src={assets.twitter_icon || "/"} alt="Twitter" className="w-4/6 h-auto" />
            </a>
            <a href="#" className="w-10 h-10 bg-[#e8c2a580] rounded-full flex items-center justify-center hover:bg-[#E8C2A5] transition">
              <img src={assets.linkedin_icon || "/"} alt="Pinterest" className="w-4/6 h-auto" />
            </a>
          </div>
        </div>
        

        <div data-aos="zoom-in-left" className="bg-[#F8F2EE]/80 p-8 rounded-xl shadow-sm border border-[#F8F2EE]/50">
          <h2 className="text-xl font-medium text-gray-600 mb-6">Send Us a Message</h2>
          
          {submitted && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
              <p>Thank you for your message! We'll get back to you soon.</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-600 mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-1">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent resize-none"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#e8c2a580] text-[#895025] hover:bg-[#E8C2A5] transition rounded-3xl w-full md:w-auto"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      

      <div data-aos="zoom-in" className="my-16">
        <div className="bg-[#F8F2EE]/80 rounded-xl overflow-hidden h-96 flex items-center justify-center relative">
          <div className="text-center">
            <img 
              src={assets.map_view || ""} 
              alt="Store Location" 
              className="w-full h-full opacity-80 "
            />
            {!assets.map_view && <p className="text-gray-500 mt-4">Interactive map would be displayed here</p>}
          </div>
        </div>
      </div>
      

      <div className="py-10 mb-16">
        <div data-aos="fade-down" className="flex flex-col items-center mb-10">
          <h2 className="text-2xl font-medium text-gray-500">Frequently Asked <span className="font-medium text-[#E8C2A5]">Questions</span></h2>
          <div className="w-32 h-0.5 bg-[#E8C2A5] mt-2"></div>
        </div>
        
        <div data-aos="zoom-in" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              question: "What materials are your teddy bears made from?",
              answer: "Our teddy bears are made from premium, hypoallergenic plush fabrics that are soft to touch and safe for children. We use non-toxic filling materials and secure embroidered features."
            },
            {
              question: "Do you ship internationally?",
              answer: "Yes! We ship to most countries worldwide. Shipping times and costs vary depending on location. You can see specific shipping information during checkout."
            },
            {
              question: "What is your return policy?",
              answer: "We offer a 30-day return policy for unused items in original packaging. Custom or personalized teddy bears cannot be returned unless there is a manufacturing defect."
            },
            {
              question: "Do you offer gift wrapping?",
              answer: "Yes, we offer premium gift wrapping services with custom message cards. You can select this option during checkout for a small additional fee."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-[#F8F2EE]/80 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-500 mb-2">{faq.question}</h3>
              <p className="text-gray-500">{faq.answer}</p>
            </div>
          ))}
        </div>
        
        <div data-aos="fade-up" className="text-center mt-8">
          <p className="text-gray-600">
            Have more questions? <a href="#" className="text-[#895025]/70 hover:underline">Check our FAQ page</a> or contact us directly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
