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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@google/generative-ai/dist/index.mjs [app-route] (ecmascript)");
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
const genAI = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](process.env.GEMINI_API_KEY);
const MAX_RETRIES = 2;
const INITIAL_DELAY_MS = 1000;
// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // Max 10 requests per minute
const REQUEST_COOLDOWN_MS = 3000; // 3 seconds between requests
// In-memory cache for responses (simple implementation)
const responseCache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
// Track requests per IP
const requestTracker = new Map();
let lastRequestTime = 0;
function getClientIP(req) {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown';
    console.log(`[DEBUG] Client IP identified: ${ip}`);
    return ip;
}
function isRateLimited(ip) {
    const now = Date.now();
    const requests = requestTracker.get(ip) || [];
    // Remove old requests outside the window
    const recentRequests = requests.filter((time)=>now - time < RATE_LIMIT_WINDOW_MS);
    if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
        const oldestRequest = Math.min(...recentRequests);
        const retryAfter = Math.ceil((oldestRequest + RATE_LIMIT_WINDOW_MS - now) / 1000);
        console.log(`[DEBUG] IP ${ip} rate limited: Too many requests. Retry after ${retryAfter}s.`);
        return {
            limited: true,
            retryAfter
        };
    }
    // Check cooldown between requests
    if (now - lastRequestTime < REQUEST_COOLDOWN_MS) {
        const retryAfter = Math.ceil((lastRequestTime + REQUEST_COOLDOWN_MS - now) / 1000);
        console.log(`[DEBUG] IP ${ip} rate limited: Cooldown period. Retry after ${retryAfter}s.`);
        return {
            limited: true,
            retryAfter
        };
    }
    // Update tracker
    recentRequests.push(now);
    requestTracker.set(ip, recentRequests);
    lastRequestTime = now;
    console.log(`[DEBUG] IP ${ip} not rate limited. Current requests in window: ${recentRequests.length}`);
    return {
        limited: false
    };
}
function getCachedResponse(message) {
    const cached = responseCache.get(message.toLowerCase().trim());
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
        console.log(`[DEBUG] Cache hit for message: "${message.substring(0, 50)}..."`);
        return cached.response;
    }
    if (cached) {
        responseCache.delete(message.toLowerCase().trim());
        console.log(`[DEBUG] Cache expired for message: "${message.substring(0, 50)}..."`);
    } else {
        console.log(`[DEBUG] Cache miss for message: "${message.substring(0, 50)}..."`);
    }
    return null;
}
function cacheResponse(message, response) {
    // Limit cache size to 100 entries
    if (responseCache.size >= 100) {
        const firstKey = responseCache.keys().next().value;
        if (firstKey) {
            responseCache.delete(firstKey);
            console.log(`[DEBUG] Cache full, removed oldest entry: "${firstKey.substring(0, 50)}..."`);
        }
    }
    responseCache.set(message.toLowerCase().trim(), {
        response,
        timestamp: Date.now()
    });
    console.log(`[DEBUG] Response cached for message: "${message.substring(0, 50)}..."`);
}
async function delay(ms) {
    console.log(`[DEBUG] Delaying for ${ms}ms...`);
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
async function getPortfolioData() {
    console.log('[DEBUG] Connecting to DB and fetching portfolio data...');
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
    const [profile, skills, experiences, projects, education, trainings, achievements, additional] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$profile$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({}),
        __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$skill$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}),
        __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$experience$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).sort({
            order: 1
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$project$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).sort({
            order: 1
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$education$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).sort({
            order: 1
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$training$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).sort({
            order: 1
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$achievement$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).sort({
            order: 1
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$additional$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({})
    ]);
    const data = {
        profile,
        skills,
        experiences,
        projects,
        education,
        trainings,
        achievements,
        additional
    };
    console.log('[DEBUG] Portfolio data fetched successfully.');
    return JSON.stringify(data);
}
async function generateContentWithRetry(model, prompt, retries = MAX_RETRIES) {
    let lastError;
    console.log(`[DEBUG] Attempting to generate content with prompt (first 100 chars): "${prompt.substring(0, 100)}..."`);
    for(let attempt = 0; attempt < retries; attempt++){
        try {
            console.log(`[DEBUG] AI generation attempt ${attempt + 1}/${retries}...`);
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            console.log(`[DEBUG] AI generation successful on attempt ${attempt + 1}. Response (first 100 chars): "${text.substring(0, 100)}..."`);
            return text;
        } catch (error) {
            lastError = error;
            console.error(`[DEBUG] AI generation attempt ${attempt + 1} failed:`, error);
            // Check for quota exceeded error
            if (error.message?.includes('quota') || error.message?.includes('Quota exceeded')) {
                console.error('[DEBUG] QUOTA_EXCEEDED error detected.');
                throw new Error('QUOTA_EXCEEDED');
            }
            // If it's a 503 error and we have retries left
            if (error.status === 503 && attempt < retries - 1) {
                const delayMs = INITIAL_DELAY_MS * Math.pow(2, attempt); // Exponential backoff
                console.log(`[DEBUG] Attempt ${attempt + 1} failed with 503. Retrying in ${delayMs}ms...`);
                await delay(delayMs);
            } else if (attempt < retries - 1) {
                // Retry for other errors too
                console.log(`[DEBUG] Attempt ${attempt + 1} failed. Retrying in ${INITIAL_DELAY_MS}ms for other error...`);
                await delay(INITIAL_DELAY_MS);
            } else {
                console.error(`[DEBUG] All ${retries} AI generation attempts failed. Re-throwing error.`);
                throw error; // Re-throw if not a 503 or no retries left
            }
        }
    }
    throw lastError; // If we've exhausted all retries
}
async function POST(req) {
    let message = '';
    try {
        const body = await req.json();
        message = body.message;
        if (!message || typeof message !== 'string') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Message is required and must be a string'
            }, {
                status: 400
            });
        }
        // Get client IP for rate limiting
        const clientIP = getClientIP(req);
        // Check rate limit
        const rateLimitCheck = isRateLimited(clientIP);
        if (rateLimitCheck.limited) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Please wait ${rateLimitCheck.retryAfter} seconds before sending another message.`,
                retryAfter: rateLimitCheck.retryAfter
            }, {
                status: 429
            });
        }
        // Check cache first
        const cachedResponse = getCachedResponse(message);
        if (cachedResponse) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                reply: cachedResponse,
                cached: true
            });
        }
        const portfolioData = await getPortfolioData();
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash'
        });
        const prompt = `Developer: Answer the user's question using ONLY the information provided in Sunni Kumar's portfolio data.

    If the user asks about something not included in the portfolio data, respond by gently guiding them back to topics about Sunni (e.g., "I might not have info on that, but I can tell you more about Sunni if you'd like!").

    Do NOT fabricate information about Sunni; ensure your response is always aligned with the portfolio data.

    Portfolio data:
    ${portfolioData}

    User question: "${message}"

    Your answer:`;
        const text = await generateContentWithRetry(model, prompt);
        // Cache the response
        cacheResponse(message, text);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            reply: text
        });
    } catch (error) {
        console.error('Error in chat API:', error);
        // Handle quota exceeded or rate limits by returning a FALLBACK response
        // This ensures the user always gets an answer, even if the API is down
        if (error.message === 'QUOTA_EXCEEDED' || error.message?.includes('quota') || error.status === 429 || error.status === 503) {
            console.log('Quota/Rate limit hit - serving fallback response');
            // Import fallback responses dynamically
            const { getFallbackResponse } = await __turbopack_context__.A("[project]/lib/fallback-responses.ts [app-route] (ecmascript, async loader)");
            const fallbackReply = getFallbackResponse(message);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                reply: `${fallbackReply}\n\n---\n\n*⚡ Quick Response Mode: AI service is currently busy, serving offline data.*`,
                fallback: true
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'An error occurred while processing your request. Please try again later.'
        }, {
            status: error.status || 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b07b4578._.js.map