# TODO: Fix Quiz List Loading Issue

## Problem

- GET /api/quizzes returns 403 Forbidden because the endpoint requires admin role, but QuizList component is for users to select quizzes.

## Steps to Fix

1. Update server/router/router.js to remove requireAdmin from GET /quizzes route, allowing authenticated users to fetch quiz list.
2. Test the endpoint to ensure it works for regular users.
3. Verify client-side QuizList loads quizzes correctly.

## Status

- [x] Step 1: Edit router.js
- [ ] Step 2: Test endpoint
- [ ] Step 3: Verify client
