// Fallback responses when quota is exceeded
export const fallbackResponses: Record<string, string> = {
    // Greetings
    'hi': "Hello! I'm Sunni's AI assistant. While the AI service is temporarily unavailable, I can share that Sunni is a Senior Full Stack Engineer & AI Specialist. Feel free to explore the portfolio sections above to learn more about his skills, projects, and experience!",
    'hello': "Hi there! I'm Sunni's AI assistant. The AI service is currently in cooldown, but you can explore the portfolio sections above to learn about Sunni's tech stack (React, Next.js, Python, AI/ML), work experience, and projects!",
    'hey': "Hey! While the AI service resets, feel free to browse through Sunni's impressive portfolio above. You'll find details about his senior engineering roles, technical skills, and innovative projects!",

    // Skills & Tech Stack
    'skills': "Sunni's core skills include:\n\n**Frontend:** React, Next.js, TypeScript, Tailwind CSS\n**Backend:** Node.js, Python, FastAPI\n**AI/ML:** TensorFlow, PyTorch, LangChain\n**Databases:** MongoDB, PostgreSQL, Redis\n**Cloud:** AWS, Google Cloud, Docker\n\nCheck the 'Technical Arsenal' section above for the complete list!",
    'tech stack': "Sunni works with modern technologies:\n\n• **Web:** React, Next.js, TypeScript\n• **Backend:** Python, Node.js, FastAPI\n• **AI:** Machine Learning, NLP, Computer Vision\n• **DevOps:** Docker, Kubernetes, CI/CD\n\nScroll up to see the detailed skills section!",
    'technologies': "Sunni specializes in full-stack development and AI/ML. His tech stack includes React, Next.js, Python, TensorFlow, and cloud platforms. Browse the portfolio sections above for detailed information!",

    // Experience
    'experience': "Sunni has extensive experience as a Senior Full Stack Engineer and AI Specialist. Check the 'Work Experience' section above to see his detailed professional journey, including roles, responsibilities, and achievements!",
    'work': "Sunni has worked in senior engineering roles focusing on full-stack development and AI integration. Visit the 'Work Experience' section above for detailed information about his professional background!",

    // Projects
    'projects': "Sunni has built impressive projects ranging from web applications to AI/ML solutions. Check out the 'Selected Works' section above to see his portfolio projects with live demos and source code!",
    'portfolio': "You can explore Sunni's portfolio projects in the 'Selected Works' section above. Each project showcases different technologies and problem-solving approaches!",

    // Contact
    'contact': "You can reach Sunni through:\n\n• **GitHub:** Check the social links in the hero section\n• **LinkedIn:** Available in the navigation\n• **Email:** Look for the 'Hire Me' button in the navigation bar\n\nFeel free to connect!",
    'email': "To get Sunni's contact information, click the 'Hire Me' button in the navigation bar above, or check the social media links in the hero section!",

    // Education
    'education': "Sunni's educational background is detailed in the 'Education' section below. Scroll down to see his academic qualifications, institutions, and achievements!",
    'degree': "Check the 'Education' section below for information about Sunni's academic background and qualifications!",

    // Default
    'default': "I'm currently in low-power mode due to high demand. However, you can find answers to most questions by exploring the portfolio sections above:\n\n• **Skills** - Technical Arsenal section\n• **Experience** - Work Experience section\n• **Projects** - Selected Works section\n• **Education** - Education section below\n• **Contact** - Social links & 'Hire Me' button\n\nFeel free to browse!"
};

export function getFallbackResponse(message: string): string {
    const lowerMessage = message.toLowerCase().trim();

    // Check for exact matches
    if (fallbackResponses[lowerMessage]) {
        return fallbackResponses[lowerMessage];
    }

    // Check for partial matches
    for (const [key, response] of Object.entries(fallbackResponses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }

    // Return default response
    return fallbackResponses.default;
}
