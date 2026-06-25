import { useEffect, useRef, useState } from 'react';
import { User, Mail, Send, Check, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SocialLinks from './SocialLinks.jsx';

const EMAILJS_PUBLIC_KEY = 'Ca7CApKhcqNmvPs9I';
const EMAILJS_SERVICE_ID = 'emailbot';
const EMAILJS_TEMPLATE_ID = 'emailbot_template';

export default function Contact() {
    const formRef = useRef(null);
    const [status, setStatus] = useState({ state: 'idle', message: '' });

    useEffect(() => {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setStatus({ state: 'sending', message: '' });

        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current).then(
            () => {
                setStatus({ state: 'sent', message: "Thanks for reaching out! I'll get back to you soon." });
                formRef.current.reset();
                setTimeout(() => setStatus({ state: 'idle', message: '' }), 5000);
            },
            (error) => {
                console.error('FAILED...', error);
                setStatus({ state: 'failed', message: 'Oops! Something went wrong. Please try again later.' });
                setTimeout(() => setStatus({ state: 'idle', message: '' }), 3000);
            }
        );
    };

    const { state, message } = status;
    const isSending = state === 'sending';

    let buttonContent = (
        <>
            <span>Send Message</span>
            <Send className="w-4 h-4" />
        </>
    );
    if (state === 'sending') buttonContent = <span>Sending...</span>;
    else if (state === 'sent')
        buttonContent = (
            <>
                <span>Sent!</span>
                <Check className="w-4 h-4" />
            </>
        );
    else if (state === 'failed')
        buttonContent = (
            <>
                <span>Failed</span>
                <AlertCircle className="w-4 h-4" />
            </>
        );

    return (
        <section id="contact" className="py-32 text-center relative foreground-element">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-theme-primary/20 rounded-full blur-[100px] -z-10"></div>
            <div className="max-w-3xl mx-auto px-6 section-fade">
                <p className="text-theme-primary font-medium mb-4">What's Next?</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Get In Touch</h2>
                <div className="glass-card text-left p-8 md:p-10 border-theme-glass-border">
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-white">Drop a message</h3>
                        <p className="text-gray-400 text-sm">
                            Casual chat or serious business — I'm all ears. You can even stay anonymous!
                        </p>
                    </div>
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="user_name" className="block text-theme-primary text-xs font-bold uppercase tracking-wider mb-2">
                                Name (Optional)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="w-5 h-5 text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    name="user_name"
                                    id="user_name"
                                    placeholder="Anonymous Friend"
                                    className="w-full bg-theme-bg border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-gray-200 placeholder-gray-600 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-theme-primary text-xs font-bold uppercase tracking-wider mb-2">
                                Email (Optional)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="w-5 h-5 text-gray-500" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="you@example.com"
                                    className="w-full bg-theme-bg border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-gray-200 placeholder-gray-600 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-theme-primary text-xs font-bold uppercase tracking-wider mb-2">
                                Message
                            </label>
                            <div className="relative">
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="4"
                                    required
                                    placeholder="Hey Shreyes, just wanted to say hi..."
                                    className="w-full bg-theme-bg border border-gray-700 rounded-lg p-4 text-gray-200 placeholder-gray-600 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary outline-none transition-all"
                                ></textarea>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isSending}
                            className={`w-full py-3 px-6 bg-theme-primary text-black font-bold rounded-lg hover:opacity-90 transition-all transform hover:-translate-y-1 shadow-lg shadow-theme-primary/20 flex justify-center items-center gap-2 ${isSending ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            {buttonContent}
                        </button>
                        <p
                            className={`text-center text-sm mt-4 h-6 ${state === 'sent' ? 'text-green-400' : state === 'failed' ? 'text-red-400' : 'text-gray-400'
                                }`}
                        >
                            {message}
                        </p>
                    </form>
                </div>
                <div className="mt-20 pt-8 border-t border-gray-700/50 flex flex-col items-center gap-4">
                    <div className="flex gap-6">
                        <SocialLinks />
                    </div>
                    <p className="text-gray-500 text-sm">Designed &amp; Built by Shreyes Ram Vijaykumar</p>
                </div>
            </div>
        </section>
    );
}
