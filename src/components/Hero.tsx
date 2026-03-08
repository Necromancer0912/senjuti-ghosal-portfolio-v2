import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col justify-end p-6 pb-20 md:p-12 md:pb-24 pt-32">
            <div className="max-w-7xl mx-auto w-full relative">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-xl md:text-3xl font-light tracking-wide text-white/70 mb-4 ml-1">
                        Machine Learning & Cyber Security
                    </p>
                    <h1 className="text-massive text-white whitespace-nowrap overflow-hidden">
                        SENJUTI
                        <br />
                        GHOSAL
                    </h1>
                </motion.div>

                <motion.div
                    className="absolute right-0 bottom-0 mb-8 mr-4 hidden md:flex items-center gap-4 origin-bottom-right"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                >
                    <div className="w-32 h-[1px] bg-white/30"></div>
                    <span className="text-sm uppercase tracking-widest text-white/50">Scroll to explore</span>
                    <ArrowDownRight className="w-5 h-5 text-[var(--accent)]" />
                </motion.div>
            </div>

            {/* Abstract Illustration Graphic Placeholder */}
            <motion.div
                className="absolute top-1/4 right-[10%] w-[40vw] max-w-lg aspect-square rounded-full blur-[100px] bg-[var(--accent)] opacity-10 pointer-events-none z-[-1]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.15, 0.1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
        </section>
    );
}
