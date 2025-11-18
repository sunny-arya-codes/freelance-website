
import dbConnect from '../src/lib/db';
import Profile from '../src/models/profile';
import Skill from '../src/models/skill';
import Experience from '../src/models/experience';
import Project from '../src/models/project';
import Education from '../src/models/education';
import Training from '../src/models/training';
import Achievement from '../src/models/achievement';
import Additional from '../src/models/additional';
import User from '../src/models/user';
import bcrypt from 'bcryptjs';

const resumeData = {
    "profile": {
      "name": "Sunni Kumar",
      "title": "AI/ML & Backend Engineer",
      "location": "Bengaluru, India",
      "contact": {
        "email": "sunnikumar121@gmail.com",
        "phone": "+91 8884487487",
        "linkedin": "https://www.linkedin.com/in/sunnikumar/",
        "github": "https://github.com/sunnikumar",
        "portfolio": "https://sunnikumar.in"
      },
      "summary": "A dedicated AI/ML and Backend Engineer with a strong foundation in building scalable applications and a passion for leveraging data to create intelligent solutions. Proven ability to lead projects, adapt to new technologies, and deliver high-quality results in fast-paced environments.",
      "high_res_image_url": "https://avatars.githubusercontent.com/u/12345678?v=4"
    },
    "skills": [
      {
        "category": "Programming & Scripting",
        "skills": ["Java", "Python", "JavaScript", "TypeScript", "HTML/CSS", "SQL"]
      },
      {
        "category": "ML & Data Science",
        "skills": ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "NLTK", "Spacy", "Langchain"]
      },
      {
        "category": "Frameworks & Technologies",
        "skills": ["Spring Boot", "Django", "Flask", "Node.js", "React.js", "Next.js", "Angular", "Docker", "Kubernetes"]
      },
      {
        "category": "Databases",
        "skills": ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Elasticsearch"]
      },
      {
        "category": "Cloud & DevOps",
        "skills": ["AWS", "GCP", "CI/CD", "Git", "Jenkins"]
      }
    ],
    "experience": [
      {
        "title": "Sr. Software Engineer",
        "company": "FreshMenu",
        "company_website": "https://www.freshmenu.com/",
        "location": "Bengaluru, India",
        "start_date": "July 2022",
        "end_date": "Present",
        "responsibilities": [
          "Led the development of a recommendation engine, improving user engagement by 20%.",
          "Designed and implemented a real-time fraud detection system, reducing fraudulent transactions by 15%.",
          "Built and maintained scalable backend services for order processing and inventory management."
        ],
        "tech_stack": ["Java", "Spring Boot", "Python", "Flask", "AWS", "Docker", "PostgreSQL"]
      },
      {
        "title": "Software Engineer",
        "company": "InnovateTech",
        "company_website": "https://innovatetech.com/",
        "location": "Bengaluru, India",
        "start_date": "June 2020",
        "end_date": "June 2022",
        "responsibilities": [
          "Developed and maintained RESTful APIs for a large-scale e-commerce platform.",
          "Collaborated with the data science team to integrate machine learning models into production.",
          "Optimized database queries, improving application performance by 30%."
        ],
        "tech_stack": ["Python", "Django", "JavaScript", "React.js", "MongoDB", "GCP"]
      }
    ],
    "projects": [
      {
        "name": "AI-Powered Chatbot for Customer Support",
        "type": "Personal Project",
        "repo_url": "https://github.com/sunnikumar/ai-chatbot",
        "description": "A chatbot built with TensorFlow and NLTK to handle customer queries. The model is trained on a custom dataset of conversations and can answer questions about products, orders, and shipping.",
        "tech_stack": ["Python", "TensorFlow", "NLTK", "Flask"]
      },
      {
        "name": "Real-time Stock Price Prediction",
        "type": "Personal Project",
        "notebook_url": "https://github.com/sunnikumar/stock-prediction/blob/main/notebook.ipynb",
        "description": "A project that uses an LSTM neural network to predict stock prices in real-time. The model is trained on historical stock data and can predict the price for the next 30 minutes with high accuracy.",
        "tech_stack": ["Python", "PyTorch", "Pandas", "Scikit-learn"]
      }
    ],
    "education": [
      {
        "institution": "Visvesvaraya Technological University",
        "program": "Bachelor of Engineering in Computer Science",
        "cgpa": "8.5",
        "start_date": "August 2016",
        "end_date": "May 2020",
        "location": "Bengaluru, India",
        "order": 1
      }
    ],
    "training": [
        {
            "name": "Machine Learning",
            "provider": "Coursera",
            "start_date": "2020",
            "end_date": "2020",
            "certificate_url": "https://www.coursera.org/account/accomplishments/certificate/ABCDEFG12345",
            "order": 1
        }
    ],
    "achievements": [
        {
            "title": "Winner, Hackathon 2021",
            "description": "Won first place in the company-wide hackathon for developing a prototype of a new food delivery tracking system.",
            "event": "FreshMenu Hackathon 2021",
            "order": 1
        }
    ],
    "additional": {
      "languages": ["English", "Hindi"],
      "hobbies": ["Reading", "Traveling", "Coding"]
    }
  };

const seedDatabase = async () => {
  try {
    await dbConnect();
    console.log('Connected to the database.');

    // Clear existing data
    await Profile.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    await Project.deleteMany({});
    await Education.deleteMany({});
    await Training.deleteMany({});
    await Achievement.deleteMany({});
    await Additional.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data.');

    // Seed Profile
    await Profile.create(resumeData.profile);
    console.log('Seeded profile.');

    // Seed Skills
    await Skill.insertMany(resumeData.skills);
    console.log('Seeded skills.');

    // Seed Experience
    await Experience.insertMany(resumeData.experience.map((exp, index) => ({ ...exp, order: index + 1 })));
    console.log('Seeded experience.');

    // Seed Projects
    await Project.insertMany(resumeData.projects.map((proj, index) => ({ ...proj, order: index + 1 })));
    console.log('Seeded projects.');

    // Seed Education
    await Education.insertMany(resumeData.education.map((edu, index) => ({ ...edu, order: index + 1 })));
    console.log('Seeded education.');

    // Seed Training
    await Training.insertMany(resumeData.training.map((train, index) => ({ ...train, order: index + 1 })));
    console.log('Seeded training.');

    // Seed Achievements
    await Achievement.insertMany(resumeData.achievements.map((ach, index) => ({ ...ach, order: index + 1 })));
    console.log('Seeded achievements.');

    // Seed Additional
    await Additional.create(resumeData.additional);
    console.log('Seeded additional info.');

    // Seed User
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash('admin', salt);
    await User.create({ username: 'admin', password_hash });
    console.log('Seeded user.');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  }
};

seedDatabase();
