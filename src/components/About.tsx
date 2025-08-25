import profilePhoto from '@/assets/profile-photo.jpg';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            About Me
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative group">
                <div className="w-80 h-80 rounded-3xl overflow-hidden glass-card p-2 glow-hover">
                  <img
                    src={profilePhoto}
                    alt="Alex Chen - Full Stack Engineer"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                {/* Floating decoration */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-primary rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity float"></div>
              </div>
            </div>

            {/* About Content */}
            <div className="space-y-6 slide-up">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Building the Future, One Line at a Time
              </h3>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  With over 5 years of experience in full-stack development, I specialize in creating 
                  scalable web applications using modern technologies like React, Node.js, and cloud platforms.
                </p>
                
                <p>
                  My passion lies in transforming complex problems into elegant, user-friendly solutions. 
                  I believe in writing clean, maintainable code and staying updated with the latest 
                  industry trends and best practices.
                </p>
                
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                  projects, or mentoring aspiring developers in the community.
                </p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="text-center md:col-span-1 col-span-2">
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Technologies Mastered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;