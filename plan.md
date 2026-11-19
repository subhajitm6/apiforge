**Fix Critical Multi-User Data Isolation Bug in APIForge**

There is a critical account isolation issue in APIForge.

When I log in with Account A and perform API testing, then log out and log in with Account B, Account A's previous API testing data is visible in Account B.

I need you to investigate and fix this issue across the entire application.

**Requirements:**

1. Inspect the complete authentication flow and database schema.
2. Ensure every user's API collections, requests, test results, execution history, environments, saved configurations and other private resources are associated with their authenticated user ID.
3. Update all backend database queries to retrieve, create, update and delete records only within the authenticated user's ownership.
4. Never trust user_id provided by frontend requests. Derive identity from validated authentication credentials.
5. On logout, clear previous account's cached data, application state and user-specific local storage.
6. On login, fetch fresh data belonging exclusively to the newly authenticated account.
7. Protect individual resource endpoints against IDOR (Insecure Direct Object Reference) vulnerabilities.
8. Ensure one user cannot read, update or delete another user's resources by manipulating resource IDs.
9. Review all frontend API calls and backend endpoints for missing user-level filtering.

**Testing requirements:**
- Create two separate test accounts.
- Perform API testing using Account A.
- Log out and log in using Account B.
- Verify that Account B cannot see Account A's collections, requests, history or results.
- Try accessing Account A's resource IDs through Account B.
- Verify unauthorized access is rejected.
- Log back into Account A and verify its original data remains intact.

**Important:** Do not simply hide previous data in the frontend. Fix the actual backend authorization and database-level ownership issues.

Preserve the existing UI, functionality and architecture. Do not unnecessarily rewrite working features.

First identify the root cause, then implement the fix and test the complete authentication and data-isolation flow.