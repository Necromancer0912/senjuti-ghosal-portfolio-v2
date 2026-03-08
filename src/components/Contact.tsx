import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <section id="contact" className="py-32 px-6 md:px-12 bg-black text-white min-h-[80vh] flex flex-col justify-between">
            <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center items-center text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[var(--accent)] font-medium mb-8 tracking-widest uppercase"
                >
                    What's Next?
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-8xl font-display font-bold mb-12 hover:text-white/80 transition-colors cursor-pointer"
                >
                    Let's Work <br />
                    Together
                </motion.h2>

                <motion.a
                    href="mailto:senjuti25085@iiitd.ac.in"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider rounded-full hover:bg-[var(--accent)] transition-colors duration-300"
                >
                    Get in touch
                </motion.a>
            </div>

            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 uppercase tracking-widest pt-12 border-t border-white/10">
                <p>&copy; {new Date().getFullYear()} Senjuti Ghosal</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-white transition-colors">GitHub</a>
                </div>
            </div>
        </section>
    );
}
