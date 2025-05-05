# Cursor AI Rules for Ísland.is / Devland Projects

These rules guide the AI in generating and editing code consistent with the standards, practices, and technology stack of the Digital Iceland (Ísland.is) projects, as documented on Devland.

## 1. Guiding Principles & Values

*   **User-Centered:** Prioritize the user experience above all. Design and build intuitive, efficient, and helpful services.
*   **Accessibility First:** Accessibility is mandatory, not optional. All development MUST conform to WCAG 2.1 Level AA [4]. Design for inclusivity, considering users with diverse abilities and equipment [4].
*   **Performance:** Build fast and responsive applications. Optimize loading times and resource usage [5].
*   **Security:** Implement robust security measures throughout the stack. Follow best practices for authentication, authorization, data handling, and dependency management [5, 2].
*   **Open Source:** Prefer Free and Open-Source Software (FOSS) where practical and aligned with project goals [5].
*   **Maintainability:** Write clear, well-documented, modular, and testable code. Follow established coding standards [5, 6].
*   **Once-Only Principle:** Minimize data collection burdens on users by reusing information where appropriate and secure [2].
*   **Collaboration:** Follow contribution guidelines for external and internal collaboration, including code reviews and commit standards [6].

## 2. Technology Stack & Tools

Adhere strictly to the defined technology stack and tooling [5]:

*   **Language:** **TypeScript** for frontend and backend. Leverage strong typing for safety and clarity [5].
*   **Monorepo Management:** **NX** for structuring the codebase, managing dependencies, and running tasks. Follow NX conventions [5, 7].
*   **Frontend Framework:** **React** with **Next.js**. Utilize Next.js features for routing, SSR/SSG, and API routes where appropriate [5].
*   **Styling:** **Vanilla Extract** for type-safe CSS-in-TS [5].
*   **UI Components:**
    *   Develop reusable components using **React** [5].
    *   Utilize the official **`@island.is/island-ui` Design System** for UI elements and styling consistency [5]. Prefer using existing `island-ui` components over creating custom ones for common patterns.
    *   Use **Storybook** for component development, documentation, and visual testing in isolation [5].
*   **State Management (API):** **Apollo Client** for managing GraphQL state, caching, and interactions [5].
*   **State Management (Local):** (Specify project standard if one exists, e.g., React Context, Zustand. If not specified, use standard React state management like `useState`, `useReducer`.)
*   **GraphQL Code Generation:** **GraphQL Code Generator** to automatically generate TypeScript types and client-side code from GraphQL schemas [5].
*   **Backend Runtime:** **Node.js** (with TypeScript) [5].
*   **Authentication:** Use the standard authentication libraries and patterns, particularly **`@island.is/auth-nest-tools`** for backend services [5].
*   **Testing:**
    *   **End-to-End:** **Playwright** for automated browser testing [5].
    *   **Unit/Integration:** Use standard JavaScript/TypeScript testing libraries (e.g., Jest, Vitest - specify if a standard exists) for testing individual functions, components, and modules. All new code requires corresponding tests [6].
*   **Code Formatting:** Use **Prettier** (configure according to project standards) to ensure consistent code style.
*   **Linting:** Use **ESLint** (configure according to project standards) to catch potential errors and enforce coding practices.
*   **Infrastructure:** Define infrastructure using **Infrastructure as Code (IaC)**, specifically with **AWS CDK (Cloud Development Kit)** [5].
*   **CI/CD:** Use **GitHub Actions** for continuous integration and deployment workflows [5].
*   **Logging & Monitoring:** Integrate with **Datadog** for logging and application performance monitoring [5]. Ensure relevant events and errors are logged.
*   **Content Management:** Utilize **Contentful** as the headless CMS [5]. Structure code appropriately for fetching and rendering content from Contentful.

## 3. API Design (Resource Oriented Design)

All APIs MUST adhere to the Devland API Design Guide based on Resource Oriented Design (ROD) [2].

*   **Model:** Design APIs around resources (collections, simple resources) [2].
*   **Methods:** Use standard HTTP methods (GET, POST, PUT, PATCH, DELETE) correctly mapped to resource operations. Use custom methods (RPCs) only when standard methods are insufficient [2].
*   **Resource Naming:**
    *   Use plural nouns for collection IDs (resource types) [2].
    *   Use standard case conventions (e.g., camelCase for JSON fields, PascalCase for GraphQL types). Follow specific GraphQL naming conventions outlined in the guide [2].
    *   Resource IDs are typically assigned by the service and MUST be immutable [2].
*   **Data Format:**
    *   **JSON** for request/response bodies [2].
    *   **UTF-8** encoding [2].
    *   Handle specific Icelandic data types (e.g., Kennitala) according to standards [2].
*   **Error Handling:** Implement the standard error response format defined in the API Design Guide. Provide clear, actionable error messages [2].
*   **Pagination:** Use the standard cursor-based pagination structure (`PageInfo`, `first`, `after`, etc.) [2].
*   **Versioning:** Include the API version in the URL path (e.g., `/v1/...`) [2].
*   **Security:** Implement authentication and authorization following project standards (see `@island.is/auth-nest-tools` [5]). Validate all inputs [2].

## 4. Accessibility (a11y)

Accessibility is paramount and non-negotiable.

*   **Standard:** **WCAG 2.1 Level AA** conformance is required for all web content and applications [4].
*   **Implementation:**
    *   Use semantic HTML elements correctly.
    *   Ensure keyboard accessibility and focus management.
    *   Provide text alternatives (`alt` text) for non-decorative images.
    *   Use ARIA attributes sparingly and correctly when native semantics are insufficient.
    *   Ensure sufficient color contrast (use `island-ui` theme colors).
    *   Design clear and consistent navigation.
    *   Ensure forms have proper labels, instructions, and error handling.
    *   Test with assistive technologies.

## 5. Content & UI Text

Follow the Ísland.is Content Strategy guidelines [3]:

*   **Tone:** Positive, Warm, Clear, Informative, Tactful, Helpful, Accurate [3].
*   **Clarity:** Use simple language, avoid jargon, be concise and direct [3].
*   **Consistency:** Maintain consistent terminology and style across the application. Use terms defined in the Design System (`island-ui`).
*   **URLs:** Follow the simple, predictable, user-friendly URL structure guidelines [3].
*   **Internationalization (i18n):** Design and implement with internationalization in mind. Use appropriate libraries/frameworks for managing translations.
*   **Content Source:** Fetch dynamic content primarily from **Contentful** [5].

## 6. Code Quality & Development Practices

*   **NX Generators:** **MUST** use **NX generators (`nx g ...`)** for scaffolding new applications, libraries, components, services, etc., within the monorepo [7]. This ensures consistency and adherence to project structure. Example: `nx g @nx/react:component my-new-component --project=my-app` [7].
*   **Readability:** Write clear, self-explanatory code. Use meaningful names.
*   **Modularity:** Break down logic into smaller, reusable functions/modules/components.
*   **Documentation:**
    *   Add JSDoc/TSDoc comments for complex logic, types, and public APIs.
    *   Maintain clear README files.
    *   Document architectural decisions.
    *   Update documentation alongside code changes [6].
*   **Testing:** Write comprehensive automated tests (unit, integration, e2e). New features or fixes MUST include relevant tests [6].
*   **Error Handling:** Implement robust error handling and logging (using Datadog standards [5]).
*   **Configuration:** Use environment variables for configuration/secrets.
*   **Dependencies:** Keep dependencies updated. Evaluate new dependencies carefully.
*   **Code Reviews:** Actively participate in code reviews. Ensure code adheres to these rules before merging. Address review comments constructively [6].

## 7. Version Control & Contribution

Follow the established contribution workflow [6]:

*   **Branching:** Create branches from the `main` (or `development`) branch. Branch names MUST follow the convention: `<type>/<scope>/<short-description>` (e.g., `feat/auth/add-jwt-validation`, `fix/ui/button-contrast`) [6].
    *   `<type>`: feat, fix, chore, refactor, docs, test, style, ci, perf
    *   `<scope>`: Module, component, or area of code (e.g., `api`, `web`, `application-system`, `island-ui`)
*   **Commits:** Commit messages MUST follow the **Conventional Commits** specification (https://www.conventionalcommits.org/) [6]. This is crucial for automated changelog generation and versioning.
    *   Example: `feat(auth): add endpoint for user profile retrieval`
    *   Example: `fix(web): correct layout shift on component mount`
    *   Use `!` after the type/scope for breaking changes: `refactor(api)!: change authentication middleware signature`
*   **Pull Requests (PRs):** Create PRs targeting the `main` (or `development`) branch. Ensure PR descriptions are clear and link to relevant issues [6].
*   **Commit Signing:** Ensure commits are signed (e.g., using GPG) [6].

## 8. Code Examples (Illustrative)

*   **Using Island UI Component:**
    ```typescript
    import React from 'react';
    import { Box, Text, Button } from '@island.is/island-ui/core';

    interface WelcomeCardProps {
      userName: string;
      onActionClick: () => void;
    }

    export const WelcomeCard: React.FC<WelcomeCardProps> = ({ userName, onActionClick }) => {
      return (
        <Box background="blue100" padding={4} borderRadius="large">
          <Text variant="h3" marginBottom={2}>
            Welcome, {userName}!
          </Text>
          <Text marginBottom={4}>
            Here is some important information for you.
          </Text>
          <Button onClick={onActionClick}>Perform Action</Button>
        </Box>
      );
    };
    ```
*   **Conventional Commit Message Example:**
    ```
    feat(application-system): implement PDF generation for submission

    Adds a new service and integrates it with the application submission
    flow to generate a PDF summary upon completion.

    Closes #123
    ```
*   **NX Generator Usage (Conceptual) [7]:**
    ```bash
    # Example: Generate a new library for shared utilities
    nx g @nx/js:lib shared-utils --directory=libs/shared

    # Example: Generate a new React component within the 'web-app' project
    nx g @nx/react:component UserProfileCard --project=web-app --directory=components
    ```

---

## References

[1]: `https://docs.devland.is/` (Devland Homepage - General Context)
[2]: `https://docs.devland.is/technical-overview/api-design-guide` (API Design Guide)
[3]: `https://island.is/en/o/digital-iceland/content-strategy` (Content Strategy)
[4]: `https://island.is/en/o/digital-iceland/accessibility` (Accessibility Guidelines)
[5]: `https://docs.devland.is/technical-overview/technical-overview` (Technical Overview - Stack, Tools, Principles)
[6]: `https://docs.devland.is/development/external-contribute` (Contribution Guidelines - Workflow, Commits, Testing, Reviews)
[7]: `https://docs.devland.is/development/generate` (NX Code Generation)

