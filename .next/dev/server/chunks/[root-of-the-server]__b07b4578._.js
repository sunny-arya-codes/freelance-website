module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/mongoose [external] (mongoose, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}),
"[project]/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://bytebuddy:MwIIVJzvrcFnTwnn@cluster0.mqbsh6f.mongodb.net/portfolio';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
let cached = global.mongoose || {
    conn: null,
    promise: null
};
async function dbConnect() {
    if (cached.conn) {
        console.log('Using existing database connection');
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };
        console.log('Creating new database connection to:', MONGODB_URI);
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            console.log('Database connected successfully');
            return mongoose;
        }).catch((error)=>{
            console.error('Database connection error:', error);
            // Return a mock connection in development to prevent app from crashing
            if ("TURBOPACK compile-time truthy", 1) {
                console.warn('Using mock database connection in development mode');
                return {
                    connection: {
                        readyState: 1
                    }
                };
            }
            //TURBOPACK unreachable
            ;
        });
    }
    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (e) {
        console.error('Database connection failed:', e);
        cached.promise = null;
        // In development, return a mock connection to prevent app from crashing
        if ("TURBOPACK compile-time truthy", 1) {
            console.warn('Using mock database connection in development mode');
            return {
                connection: {
                    readyState: 1
                }
            };
        }
        //TURBOPACK unreachable
        ;
    }
}
const __TURBOPACK__default__export__ = dbConnect;
}),
"[project]/models/profile.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const profileSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contact: {
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        linkedin: {
            type: String,
            required: true
        },
        github: {
            type: String,
            required: true
        },
        portfolio: {
            type: String,
            required: true
        }
    },
    summary: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    imageType: {
        type: String
    }
}, {
    timestamps: true
});
const Profile = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Profile || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Profile', profileSchema);
const __TURBOPACK__default__export__ = Profile;
}),
"[project]/models/skill.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const skillSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    category: {
        type: String,
        required: true
    },
    skills: [
        {
            type: String,
            required: true
        }
    ]
});
const Skill = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Skill || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Skill', skillSchema);
const __TURBOPACK__default__export__ = Skill;
}),
"[project]/models/experience.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const experienceSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    company_website: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    start_date: {
        type: String,
        required: true
    },
    end_date: {
        type: String
    },
    responsibilities: [
        {
            type: String,
            required: true
        }
    ],
    tech_stack: [
        {
            type: String,
            required: true
        }
    ],
    order: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    imageType: {
        type: String
    }
}, {
    timestamps: true
});
const Experience = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Experience || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Experience', experienceSchema);
const __TURBOPACK__default__export__ = Experience;
}),
"[project]/models/project.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const projectSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    repo_url: {
        type: String
    },
    notebook_url: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    tech_stack: [
        {
            type: String,
            required: true
        }
    ],
    order: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    imageType: {
        type: String
    }
}, {
    timestamps: true
});
const Project = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Project || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Project', projectSchema);
const __TURBOPACK__default__export__ = Project;
}),
"[project]/models/education.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const educationSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    institution: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true
    },
    cgpa: {
        type: String
    },
    start_date: {
        type: String,
        required: true
    },
    end_date: {
        type: String,
        required: true
    },
    portal_url: {
        type: String
    },
    relevant_coursework: [
        {
            type: String
        }
    ],
    percentage: {
        type: String
    },
    year_of_completion: {
        type: String
    },
    location: {
        type: String
    },
    order: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    imageType: {
        type: String
    }
}, {
    timestamps: true
});
const Education = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Education || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Education', educationSchema);
const __TURBOPACK__default__export__ = Education;
}),
"[project]/models/training.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const trainingSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    name: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    start_date: {
        type: String,
        required: true
    },
    end_date: {
        type: String,
        required: true
    },
    certificate_url: {
        type: String
    },
    order: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    imageType: {
        type: String
    }
}, {
    timestamps: true
});
const Training = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Training || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Training', trainingSchema);
const __TURBOPACK__default__export__ = Training;
}),
"[project]/models/achievement.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const achievementSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    badge_url: {
        type: String
    },
    certificate_url: {
        type: String
    },
    event: {
        type: String
    },
    order: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    imageType: {
        type: String
    }
}, {
    timestamps: true
});
const Achievement = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Achievement || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Achievement', achievementSchema);
const __TURBOPACK__default__export__ = Achievement;
}),
"[project]/models/additional.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const additionalSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    languages: [
        {
            type: String,
            required: true
        }
    ],
    hobbies: [
        {
            type: String,
            required: true
        }
    ]
});
const Additional = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Additional || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Additional', additionalSchema);
const __TURBOPACK__default__export__ = Additional;
}),
"[project]/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/client.mjs [app-route] (ecmascript) <export OpenAI as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$profile$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/profile.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$skill$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/skill.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$experience$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/experience.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$project$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/project.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$education$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/education.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$training$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/training.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$achievement$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/achievement.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$additional$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/additional.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
// Initialize OpenAI client
const client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__["default"]({
    baseURL: "https://integrate.api.nvidia.com/v1",
    apiKey: "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",
    dangerouslyAllowBrowser: true // Just in case, though this is server-side
});
// Ensure we don't accidentally pick up local env vars if they exist
delete process.env.OPENAI_BASE_URL;
delete process.env.OPENAI_API_KEY;
const MAX_RETRIES = 2;
const INITIAL_DELAY_MS = 1000;
// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;
const REQUEST_COOLDOWN_MS = 3000;
// Track requests
const requestTracker = new Map();
let lastRequestTime = 0;
function getClientIP(req) {
    return req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown';
}
function isRateLimited(ip) {
    const now = Date.now();
    const requests = requestTracker.get(ip) || [];
    const recentRequests = requests.filter((time)=>now - time < RATE_LIMIT_WINDOW_MS);
    if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
        const oldestRequest = Math.min(...recentRequests);
        const retryAfter = Math.ceil((oldestRequest + RATE_LIMIT_WINDOW_MS - now) / 1000);
        return {
            limited: true,
            retryAfter
        };
    }
    if (now - lastRequestTime < REQUEST_COOLDOWN_MS) {
        const retryAfter = Math.ceil((lastRequestTime + REQUEST_COOLDOWN_MS - now) / 1000);
        return {
            limited: true,
            retryAfter
        };
    }
    recentRequests.push(now);
    requestTracker.set(ip, recentRequests);
    lastRequestTime = now;
    return {
        limited: false
    };
}
async function getPortfolioData() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
    // Fetch data using lean() if available for better performance, 
    // or standard find() if not. We use Promise.all for speed.
    const [profile, skills, experiences, projects, education, trainings, achievements, additional] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$profile$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({}).lean().exec().catch(()=>__TURBOPACK__imported__module__$5b$project$5d2f$models$2f$profile$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({})),
        __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$skill$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).lean().exec().catch(()=>__TURBOPACK__imported__module__$5b$project$5d2f$models$2f$skill$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({})),
        __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$experience$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).sort({
            order: 1
        }).lean().exec().catch(()=>__TURBOPACK__imported__module__$5b$project$5d2f$models$2f$experience$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).sort({
                order: 1
            })),
        __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$project$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).sort({
            order: 1
        }).lean().exec().catch(()=>__TURBOPACK__imported__module__$5b$project$5d2f$models$2f$project$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).sort({
                order: 1
            })),
        __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$education$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).sort({
            order: 1
        }).lean().exec().catch(()=>__TURBOPACK__imported__module__$5b$project$5d2f$models$2f$education$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).sort({
                order: 1
            })),
        __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$training$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).sort({
            order: 1
        }).lean().exec().catch(()=>__TURBOPACK__imported__module__$5b$project$5d2f$models$2f$training$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).sort({
                order: 1
            })),
        __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$achievement$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).sort({
            order: 1
        }).lean().exec().catch(()=>__TURBOPACK__imported__module__$5b$project$5d2f$models$2f$achievement$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).sort({
                order: 1
            })),
        __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$additional$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({}).lean().exec().catch(()=>__TURBOPACK__imported__module__$5b$project$5d2f$models$2f$additional$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({}))
    ]);
    // Structure data cleanly to minimize token usage
    const data = {
        profile,
        skills: skills?.map((s)=>({
                name: s.name,
                category: s.category,
                level: s.level
            })),
        experiences: experiences?.map((e)=>({
                role: e.role,
                company: e.company,
                duration: e.duration,
                description: e.description
            })),
        projects: projects?.map((p)=>({
                title: p.title,
                description: p.description,
                techStack: p.techStack
            })),
        education,
        trainings,
        achievements,
        additional
    };
    return JSON.stringify(data);
}
async function generateContentWithRetry(systemContext, userMessage, retries = MAX_RETRIES) {
    for(let attempt = 0; attempt < retries; attempt++){
        try {
            console.log(`[DEBUG] AI generation attempt ${attempt + 1}/${retries}...`);
            // CRITICAL FIX: Changed stream: true to stream: false
            // Your frontend awaits the full JSON response, so streaming internally 
            // adds complexity and risk of dropped connections without benefit.
            const completion = await client.chat.completions.create({
                model: "openai/gpt-oss-120b",
                messages: [
                    {
                        role: "system",
                        content: systemContext
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ],
                temperature: 0.6,
                top_p: 1,
                max_tokens: 4096,
                stream: false
            });
            console.log(completion);
            // Check for error in response object (if client doesn't throw)
            if (completion.error) {
                throw new Error(`API Error: ${completion.error}`);
            }
            // Handle response extraction safely
            if (!completion.choices || completion.choices.length === 0) {
                throw new Error('Empty response structure from API');
            }
            const choice = completion.choices[0];
            if (!choice || !choice.message) {
                throw new Error('Empty response structure from API');
            }
            // DeepSeek/NVIDIA models sometimes put reasoning in a separate field
            const message = choice.message;
            let text = "";
            // Include reasoning if available (often valuable for this model)
            if (message.reasoning_content) {
                text += message.reasoning_content + "\n\n";
            }
            if (message.content) {
                text += message.content;
            }
            if (!text) {
                throw new Error('No content received in response');
            }
            console.log(`[DEBUG] AI generation successful. Length: ${text.length}`);
            return text;
        } catch (error) {
            console.error(`[DEBUG] AI generation attempt ${attempt + 1} failed:`, error.message);
            if (attempt < retries - 1) {
                const delayMs = INITIAL_DELAY_MS * Math.pow(2, attempt);
                await new Promise((resolve)=>setTimeout(resolve, delayMs));
            } else {
                throw error;
            }
        }
    }
    throw new Error("Failed to generate content after retries");
}
async function POST(req) {
    let message = "";
    try {
        const body = await req.json();
        message = body.message;
        if (!message || typeof message !== 'string') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid message'
            }, {
                status: 400
            });
        }
        const clientIP = getClientIP(req);
        const rateLimit = isRateLimited(clientIP);
        if (rateLimit.limited) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Rate limit exceeded. Retry in ${rateLimit.retryAfter}s.`,
                retryAfter: rateLimit.retryAfter
            }, {
                status: 429
            });
        }
        const portfolioData = await getPortfolioData();
        // Construct clear instructions
        const systemContext = `You are an AI assistant for Sunni Kumar. Answer questions using ONLY the provided portfolio data.
    
    Guidelines:
    - Be friendly and professional.
    - If the answer isn't in the data, politely say you don't know but can discuss Sunni's known skills.
    - Keep answers concise unless asked for details.
    
    Portfolio Data:
    ${portfolioData}`;
        const text = await generateContentWithRetry(systemContext, message);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            reply: text
        });
    } catch (error) {
        console.error('Chat API Error:', error);
        // Fallback Logic
        try {
            // Safe re-read or default
            const fallbackMessage = message || "";
            const { getFallbackResponse } = await __turbopack_context__.A("[project]/lib/fallback-responses.ts [app-route] (ecmascript, async loader)");
            const fallbackReply = getFallbackResponse(fallbackMessage);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                reply: `${fallbackReply}\n\n---\n\n*⚡ Quick Response Mode: AI service is currently busy, serving offline data.*`,
                fallback: true
            });
        } catch (e) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Service temporarily unavailable.'
            }, {
                status: 503
            });
        }
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b07b4578._.js.map