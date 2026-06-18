import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 relative z-10">
            <div className="container mx-auto px-6 py-12">
                 <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    <div className="col-span-2 md:col-span-1" >
                        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">WorkBridge</h3>
                        </Link>
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                            Find top-tier talent effortlessly. From entry-level to executive roles, we connect you with the right candidates.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">About</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a href="#locations" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Locations</a></li>
                            <li><a href="#our-process" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Our Process</a></li>
                            <li><a href="#our-story" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Our Story</a></li>
                             <li><Link to="/careers" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Careers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">Menu</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a href="#consultancy" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Consultancy</a></li>
                            <li><a href="#counselling" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Counselling</a></li>
                            <li><a href="#recruitment" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Recruitment</a></li>
                            <li><a href="#talent-sourcing" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Talent Sourcing</a></li>
                            <li><a href="#all-services" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">See All Services</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">Support</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a href="#faq" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">FAQs</a></li>
                            <li><a href="#help-center" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Help Center</a></li>
                            <li><a href="#contact-us" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">Socials</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a href="#linkedin" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">LinkedIn</a></li>
                            <li><a href="#instagram" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">Instagram</a></li>
                            <li><a href="#x" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">X</a></li>
                        </ul>
                    </div>
                 </div>
                 <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p className="text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} WorkBridge. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#legal" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Legal Notice</a>
                        <a href="#privacy" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Privacy Policy</a>
                        <a href="#terms" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Terms & Conditions</a>
                    </div>
                 </div>
            </div>
        </footer>
    );
};

export default Footer;