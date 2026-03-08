import { motion } from 'framer-motion';

const projects = [
    {
        num: "01",
        title: "University ERP System",
        tags: ["C++", "Multithreading", "Templates"],
        desc: "A high-performance, template-driven C++ ERP supporting heterogeneous queries.",
        imageColor: "from-blue-500/20 to-purple-500/20"
    },
    {
        num: "02",
        title: "Skin Disease GAN",
        tags: ["Python", "Deep Learning", "CNN", "GAN"],
        desc: "Synthetic image generation to dramatically boost CNN classification accuracy for dermatology.",
        imageColor: "from-emerald-500/20 to-teal-500/20"
    },
    {
        num: "03",
        title: "OCR Text Parsing",
        tags: ["Django", "Computer Vision", "Python"],
        desc: "Advanced optical character recognition pipeline transforming raw images into structured documents.",
        imageColor: "from-orange-500/20 to-red-500/20"
    }
];

export default function Projects() {
    return (
        <section id="work" className="py-32 px-6 md:px-12 bg-white text-black min-h-screen">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-display font-bold mb-24 uppercase"
                >
                    Selected Works
                </motion.h2>

                <div className="space-y-32">
                    {projects.map((proj, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                        >
                            <div className={`lg:col-span-7 aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br ${proj.imageColor} relative group cursor-pointer`}>
                                {/* Placeholder for AI Generated Illustration */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-50 font-display text-4xl font-bold mix-blend-overlay">
                                    {proj.title}
                                </div>

                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <motion.div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center font-bold uppercase tracking-widest text-sm scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                >
                                    View
                                </motion.div>
                            </div>

                            <div className="lg:col-span-5 lg:pl-12 flex flex-col justify-center">
                                <span className="text-8xl md:text-[12rem] font-display font-black text-gray-100 leading-none -ml-2 mb-4 select-none">
                                    {proj.num}
                                </span>
                                <h3 className="text-3xl md:text-5xl font-bold mb-6 font-display -mt-12 md:-mt-20 z-10 relative">
                                    {proj.title}
                                </h3>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {proj.tags.map(tag => (
                                        <span key={tag} className="px-4 py-2 border border-black/10 rounded-full text-xs font-semibold uppercase tracking-wider">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-xl text-gray-500 font-light">
                                    {proj.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
