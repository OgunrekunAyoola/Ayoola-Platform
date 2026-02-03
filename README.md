# Ayoola Platform

A unified web platform combining a professional blog, technical portfolio, and personal brand/agency presence.

## Purpose

The goal is to create a premium digital space that positions Ayoola as an expert writer, software engineer, and consultant. The platform serves three main functions:
- **Blog**: Showcasing thoughts on tech, policy, and creativity.
- **Portfolio**: Demonstrating technical depth through detailed case studies.
- **Brand**: Attracting high-quality clients and partners.

For detailed specifications, please refer to [master-spec.md](master-spec.md), which serves as the single source of truth for this project.

## Tech Stack

- **Frontend**: Next.js (App Router), Tailwind CSS
- **Backend**: Node.js API (Express/similar), MongoDB (Atlas)
- **Auth**: Supabase (for Admin authentication)
- **Architecture**: Monorepo

## Project Structure

This repository is organized as a monorepo:

- **`frontend/`**: The Next.js application handling the UI and public-facing pages.
- **`backend/`**: The Node.js API server handling data persistence and business logic.
- **`docs/`**: Project documentation, design specs, and reference materials.
