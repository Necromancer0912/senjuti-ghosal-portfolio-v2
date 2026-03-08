import { motion } from 'framer-motion';

export default function About() {
    return (
        <section id="about" className="py-32 px-6 md:px-12 bg-white text-black min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 w-full">
                <div>
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-display font-bold mb-8"
                    >
                        01. ABOUT
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6 text-lg md:text-xl text-gray-700 font-light leading-relaxed"
                    >
                        <p>
                            I am a Post-Graduate student in Computer Science & Engineering at IIIT Delhi, specializing in Machine Learning and Cyber Security.
                        </p>
                        <p>
                            With a strong foundation from SRM Institute of Science and Technology, I build robust, intelligent systems aiming to solve complex, real-world problems. My passion lies in bridging the gap between theoretical AI and practical security.
                        </p>
                    </motion.div>
                </div>

                <div className="flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-gray-50 p-8 md:p-12 rounded-[2rem] border border-gray-100"
                    >
                        <h3 className="text-2xl font-bold mb-8">Technical Arsenal</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold text-gray-400 mb-2 text-sm uppercase tracking-wider">Languages</h4>
                                <ul className="space-y-1 font-medium">
                                    <li>C / C++</li>
                                    <li>Python</li>
                                    <li>JavaScript</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-400 mb-2 text-sm uppercase tracking-wider">Libraries & Frameworks</h4>
                                <ul className="space-y-1 font-medium">
                                    <li>React.js</li>
                                    <li>Django</li>
                                    <li>AWS</li>
                                </ul>
                            </div>

                            <div className="col-span-2 mt-4">
                                <h4 className="font-semibold text-gray-400 mb-2 text-sm uppercase tracking-wider">Expertise</h4>
                                <ul className="space-y-1 font-medium flex flex-wrap gap-2 text-sm">
                                    <span className="px-3 py-1 bg-black text-white rounded-full">Cyber Security</span>
                                    <span className="px-3 py-1 bg-black text-white rounded-full">Machine Learning</span>
                                    <span className="px-3 py-1 bg-black text-white rounded-full">Deep Learning</span>
                                    <span className="px-3 py-1 bg-black text-white rounded-full">NLP</span>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
