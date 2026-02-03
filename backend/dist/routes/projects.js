"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Project_1 = __importDefault(require("../models/Project"));
const router = (0, express_1.Router)();
// GET /api/projects - List public projects
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Spec: list projects where visibility = 'public', sorted by createdAt desc
        // We can also allow filtering by featured if needed, but for now strict to spec.
        const projects = yield Project_1.default.find({ visibility: 'public' })
            .sort({ createdAt: -1 })
            .select('-description'); // Exclude heavy description for list view
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}));
// GET /api/projects/:slug - Get single project
router.get('/:slug', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project_1.default.findOne({ slug: req.params.slug });
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        // Spec says: "return a single project by slug where visibility = 'public' or email_gated"
        // Since our findOne doesn't filter by visibility, we are good.
        // If we wanted to restrict to only public/gated (and not 'private' if that existed), we would add that query.
        // But schema only has 'public' | 'email_gated'. So all are accessible via this endpoint.
        res.json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}));
exports.default = router;
