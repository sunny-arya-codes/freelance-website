import { useEffect, useState } from 'react';

const Timeline = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const timelineSection = document.getElementById('timeline');
            if (!timelineSection) return;

            const rect = timelineSection.getBoundingClientRect();
            const sectionHeight = timelineSection.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Calculate how much of the timeline section is visible
            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;
            
            if (sectionTop <= windowHeight && sectionBottom >= 0) {
                // Section is in view
                const visibleHeight = Math.min(windowHeight - Math.max(sectionTop, 0), sectionHeight);
                const progress = Math.min(Math.max((windowHeight - sectionTop) / (sectionHeight + windowHeight), 0), 1);
                setScrollProgress(progress);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const timelineData = [
        {
            type: "experience",
            title: "Software Engineer",
            organization: "Freshmenu - Bengaluru",
            period: "Sep 2023 - Present",
            startYear: 2023,
            description: "Working full-time as a Software Engineer, developing and maintaining scalable applications for food delivery platform.",
            technologies: ["JavaScript", "React", "Node.js", "Python", "MongoDB", "AWS"]
        },
        {
            type: "education",
            title: "BS in Data Science and Applications",
            organization: "IIT Madras - Chennai",
            period: "May 2022 - Apr 2026",
            startYear: 2022,
            description: "Pursuing Bachelor's degree in Data Science and Applications from Indian Institute of Technology Madras through online program.",
            technologies: ["Python", "Statistics", "Machine Learning", "Data Analysis", "SQL", "R"]
        },
        {
            type: "education",
            title: "Full Stack Development Course",
            organization: "Masai School - Remote",
            period: "Apr 2022 - Dec 2022",
            startYear: 2022,
            description: "Intensive full-stack development bootcamp covering modern web technologies and software engineering practices.",
            technologies: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "Git"]
        }
    ];

    // Sort by start year in descending order (most recent first)
    const sortedData = timelineData.sort((a, b) => b.startYear - a.startYear);

    return (
        <section id="timeline" className="py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold gradient-text mb-12 text-center">
                    Career Timeline
                </h2>
                
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-muted via-muted/60 to-muted/20"></div>
                        
                        {/* Animated Progress Line */}
                        <div 
                            className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 w-0.5 bg-gradient-to-b from-primary via-primary/80 to-primary/40 transition-all duration-300 ease-out"
                            style={{ height: `${scrollProgress * 100}%` }}
                        ></div>
                        
                        {/* Timeline Items */}
                        <div className="space-y-12">
                            {sortedData.map((item, index) => (
                                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:flex-row`}>
                                    {/* Timeline Dot */}
                                    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 top-1/2">
                                        <div className={`w-4 h-4 rounded-full border-4 ${
                                            item.type === 'experience' 
                                                ? 'bg-primary border-primary/30' 
                                                : 'bg-secondary border-secondary/30'
                                        } shadow-lg`}>
                                        </div>
                                    </div>
                                    
                                    {/* Content Card */}
                                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} pl-16 md:pl-0`}>
                                        <div className="glass-card p-6 rounded-2xl border border-glass-border glow-hover group relative" style={{ animationDelay: `${index * 0.1}s` }}>
                                            {/* Type Badge */}
                                            <div className="absolute -top-3 left-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    item.type === 'experience' 
                                                        ? 'bg-primary text-primary-foreground' 
                                                        : 'bg-secondary text-secondary-foreground'
                                                }`}>
                                                    {item.type === 'experience' ? 'Work' : 'Education'}
                                                </span>
                                            </div>
                                            
                                            {/* Year Badge */}
                                            <div className="absolute -top-3 right-4">
                                                <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
                                                    {item.period}
                                                </span>
                                            </div>
                                            
                                            <div className="mt-4">
                                                <h3 className="text-xl font-bold gradient-text mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                                                <p className="text-lg text-foreground font-semibold mb-2 group-hover:translate-x-1 transition-transform">{item.organization}</p>
                                                <p className="text-muted-foreground mb-4 leading-relaxed group-hover:text-foreground/80 transition-colors">{item.description}</p>
                                                
                                                {/* Technologies/Skills */}
                                                <div className="flex flex-wrap gap-2">
                                                    {item.technologies.map((tech, techIndex) => (
                                                        <span 
                                                            key={techIndex}
                                                            className={`px-2 py-1 rounded-full text-xs font-medium border ${
                                                                item.type === 'experience'
                                                                    ? 'bg-primary/10 text-primary border-primary/20'
                                                                    : 'bg-secondary/10 text-secondary-foreground border-secondary/20'
                                                            }`}
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                                
                                                {/* Progress indicator */}
                                                <div className="mt-4 pt-4 border-t border-glass-border">
                                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                        <span>{item.type === 'experience' ? 'Impact Level' : 'Progress'}</span>
                                                        <div className="flex space-x-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`w-2 h-2 rounded-full ${
                                                                        i < (item.type === 'experience' ? 4 : 3) 
                                                                            ? (item.type === 'experience' ? 'bg-primary' : 'bg-secondary')
                                                                            : 'bg-muted'
                                                                    } group-hover:animate-pulse`}
                                                                    style={{ animationDelay: `${i * 0.1}s` }}
                                                                ></div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Empty space for alternating layout on desktop */}
                                    <div className="hidden md:block w-5/12"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
