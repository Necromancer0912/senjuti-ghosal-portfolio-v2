import { motion } from 'framer-motion';

const experiences = [
    {
        role: "Project Guide: University ERP",
        company: "IIIT Delhi",
        date: "Aug 2025 - Dec 2025",
        desc: "Built a template-driven, multithreaded C++ University ERP supporting heterogeneous student/course identifiers with fast grade-based querying."
    },
    {
        role: "Deep Learning Research",
        company: "Research Project",
        date: "Nov 2024 - May 2025",
        desc: "Leveraged GAN-generated synthetic images to boost CNN model accuracy and generalization in skin disease diagnosis by enhancing data diversity."
    },
    {
        role: "Frontend Developer",
        company: "SRM Technology",
        date: "Mar 2024 - Aug 2024",
        desc: "Developed a resume parsing application using React.js and Python for frontend integrations."
    },
    {
        role: "Industrial Trainee",
        company: "Eastern Coalfields Ltd",
        date: "Nov 2023 - Jan 2024",
        desc: "Built an OCR-based application using Django, Computer Vision, and Python to convert OCR text into continuous readable document formats."
    }
];

export default function Experience() {
    return (
        <section className="py-32 px-6 md:px-12 bg-[var(--bg-color)] text-[var(--text-color)] min-h-screen">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-display font-bold mb-20 text-center"
                >
                    EXPERIENCE
                </motion.h2>

                <div className="relative border-l border-white/10 ml-4 md:ml-1/2">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="mb-16 pl-8 relative"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute w-3 h-3 bg-[var(--accent)] rounded-full -left-[6.5px] top-2 shadow-[0_0_15px_var(--accent)]" />

                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                                <h3 className="text-2xl font-bold">{exp.role}</h3>
                                <span className="text-[var(--accent)] font-medium md:ml-auto">{exp.date}</span>
                            </div>
                            <h4 className="text-xl text-white/50 mb-4 font-light">{exp.company}</h4>
                            <p className="text-gray-400 font-light leading-relaxed max-w-2xl">
                                {exp.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
