# Flowly — AI Agent Instructions

These instructions apply to all AI agents working in the Flowly project.

## 1. Project context

- Before making any changes, read `FLOWLY_PROJECT_CONTEXT.md`.
- Treat the existing project code as the primary source of truth.
- Prefer the newest implementation over outdated documentation.
- Inspect the relevant files and understand their dependencies before making changes.
- Follow the existing project architecture and established coding conventions.
- Do not assume that a feature, component, API, or dependency exists without verifying it.

## 2. Technology stack

- Use React with Vite.
- Use JavaScript and JSX exclusively.
- Do not migrate the project to TypeScript.
- Use functional React components and React hooks.
- Do not introduce Tailwind CSS or CSS Modules unless explicitly requested.
- Keep component styles in separate `.css` files.
- Keep React components in `src/`, unless the existing project structure requires otherwise.
- Use the libraries and dependencies already installed whenever possible.

## 3. Code modification rules

- Always inspect the existing file before modifying it.
- Understand the relevant component, state, props, and data flow before making changes.
- Preserve existing functionality unless the task explicitly requires changing it.
- Avoid unrelated refactoring, duplicate code, and unnecessary abstractions.
- Do not introduce new dependencies without a clear technical reason.
- Do not invent APIs, backend endpoints, data models, or business logic.
- Keep changes focused on the requested task.
- Reuse existing components, utilities, hooks, and styles where appropriate.
- Follow the existing naming conventions and file organization.
- Handle loading, empty, and error states where relevant.
- Avoid hardcoded values when the project already has a configuration or shared constant for them.
- Do not remove existing functionality simply to make an implementation easier.

## 4. React and application architecture

- Use functional components.
- Follow the Rules of Hooks.
- Keep state as close as practical to the components that use it.
- Avoid unnecessary state duplication.
- Use props for communication between components.
- Use effects only when synchronization with external systems is necessary.
- Avoid unnecessary re-renders and premature optimization.
- Keep components focused and reasonably small.
- Preserve the existing routing and application structure.
- Do not introduce a new state management library unless explicitly requested or technically necessary.

## 5. Styling and design

Preserve the existing Flowly design system:

- Dark theme.
- Purple primary accent.
- Dark cards with subtle borders.
- Light primary text and gray secondary text.
- Rounded corners.
- Minimalist, modern interface.
- Responsive layouts.

Additional rules:

- Reuse existing colors, spacing, typography, and other design tokens where available.
- Keep styles in separate `.css` files.
- Avoid unnecessary inline styles.
- Avoid introducing conflicting global styles.
- Maintain consistent spacing and alignment.
- Ensure interactive elements have clear hover, focus, and active states.
- Preserve existing animations and transitions unless asked to change them.
- Do not redesign existing screens without an explicit request.

## 6. Responsive design and accessibility

- Ensure all new and modified UI works on mobile, tablet, and desktop.
- Avoid fixed dimensions when they could break responsive layouts.
- Prevent horizontal overflow.
- Use semantic HTML elements.
- Ensure buttons and interactive elements are keyboard accessible.
- Provide accessible labels for form controls.
- Preserve sufficient contrast between text and backgrounds.
- Do not rely on color alone to communicate important information.
- Respect the existing accessibility patterns in the project.

## 7. UI language

- Use Lithuanian for all user-facing UI text unless explicitly requested otherwise.
- Keep labels, buttons, notifications, and error messages short and clear.
- Preserve existing terminology wherever practical.
- Do not translate code identifiers, variable names, or API fields unnecessarily.
- Avoid mixing Lithuanian and English in the user interface.

## 8. Data handling and security

- Never expose secrets, API keys, passwords, or tokens in frontend code.
- Do not invent backend behavior or assume that a request succeeds.
- Validate user input where appropriate.
- Preserve existing authentication and authorization behavior.
- Do not weaken existing security checks.
- Avoid logging sensitive information.
- Follow the existing error-handling and data-fetching patterns.

## 9. Debugging and error handling

- Identify the underlying cause of a problem before changing code.
- Inspect relevant error messages and the surrounding implementation.
- Fix the root cause rather than hiding symptoms.
- Avoid suppressing errors without a clear reason.
- Do not replace working logic with a workaround unless necessary.
- Verify that a fix does not introduce regressions in related functionality.

## 10. Dependencies and project configuration

- Inspect `package.json` before adding or changing dependencies.
- Prefer existing packages and browser capabilities.
- Do not modify Vite configuration or build scripts unnecessarily.
- Do not change the package manager or lockfile format.
- Avoid unnecessary changes to environment variables and configuration files.
- Never remove dependencies without verifying that they are unused.

## 11. Testing and verification

Before finishing any code change:

1. Review all modified files.
2. Check imports, exports, and file paths.
3. Check for syntax errors and obvious runtime issues.
4. Run the relevant existing tests, if available.
5. Run the project's build command when practical.
6. Check that the requested functionality works.
7. Check that existing functionality has not been unintentionally broken.
8. Check responsive behavior on relevant screen sizes.
9. Verify that no unnecessary dependencies or unrelated changes were introduced.

If a check cannot be performed, clearly state which check was skipped and why.

Never claim that tests or builds passed unless they were actually executed successfully.

## 12. Working process

For every task, follow this workflow:

1. Read `FLOWLY_PROJECT_CONTEXT.md`.
2. Inspect the relevant source files and project structure.
3. Identify the requested change and its impact on existing functionality.
4. Plan the smallest reasonable implementation.
5. Make the necessary changes while following project conventions.
6. Review the resulting code and check for regressions.
7. Run the relevant tests and build checks.
8. Report the changes and verification results.

For simple tasks, keep the process lightweight while still following the essential checks.

If requirements are ambiguous and different interpretations could materially affect the implementation, ask for clarification instead of inventing requirements.

## 13. Scope control

- Implement only what the user requested.
- Do not redesign unrelated components.
- Do not change existing business logic without a clear requirement.
- Do not perform large-scale refactoring as part of a small feature.
- If an additional issue is discovered, report it separately unless fixing it is necessary for the requested task.
- When a requested change conflicts with the existing architecture, explain the conflict and propose a minimal solution.

## 14. Presenting changes

When finishing a task:

- Briefly summarize what was changed.
- List every modified or newly created file using its exact path.
- Clearly distinguish between new files and modified files.
- Explain important implementation decisions when relevant.
- Include the commands used to test the changes and their actual results.
- Mention any checks that could not be completed.
- If code must be pasted manually, provide the complete updated file rather than incomplete fragments.
- Clearly state whether a file should be created or replaced.
- Provide concise instructions for testing the result.

## 15. Core principles

Always prioritize:

1. Correctness over unnecessary complexity.
2. Existing architecture over introducing new patterns.
3. Minimal changes over unrelated refactoring.
4. Preserving functionality over rewriting working code.
5. Consistent design over arbitrary visual changes.
6. Verified results over assumptions.
7. Clear communication over unsupported claims.
