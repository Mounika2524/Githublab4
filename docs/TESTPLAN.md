# COBOL App Test Plan

This test plan covers all business logic in the current COBOL application (`main.cob`, `operations.cob`, `data.cob`) for student account balance management.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|-----------------------|----------------|------------|-----------------|----------------|--------------------|----------|
| TC-001 | View initial balance from DataProgram | Application built and initial balance equals 1000.00 | 1. Start app 2. Select option 1 (View Balance) 3. Select option 4 (Exit) | Displayed balance is 1000.00 | | | |
| TC-002 | Credit account updates balance | Starting balance 1000.00 | 1. Start app 2. Select option 2 (Credit) 3. Enter credit amount 250.00 4. Select option 1 (View Balance) 5. Select option 4 (Exit) | Updated balance is 1250.00 | | | |
| TC-003 | Debit account with sufficient funds | Starting balance 1000.00 | 1. Start app 2. Select option 3 (Debit) 3. Enter debit amount 400.00 4. Select option 1 (View Balance) 5. Select option 4 (Exit) | Updated balance is 600.00 | | | |
| TC-004 | Debit account with insufficient funds | Starting balance 1000.00 | 1. Start app 2. Select option 3 (Debit) 3. Enter debit amount 1500.00 4. Optionally select 1 to verify balance unchanged 5. Select option 4 (Exit) | Display "Insufficient funds" and balance remains 1000.00 | | | |
| TC-005 | Reject invalid menu selection | App running | 1. Start app 2. Enter 9 3. Enter 4 (Exit) | Display "Invalid choice, please select 1-4" | | | |
| TC-006 | No negative balance after debit operation | Starting balance 1000.00 | 1. Start app 2. Select option 3 (Debit) 3. Enter debit amount 1000.01 4. Select option 1 5. Select option 4 (Exit) | Display "Insufficient funds" and balance remains 1000.00 | | | |
| TC-007 | Correct call chaining behavior (Main -> Operations -> DataProgram) | App source code unchanged | 1. Start app 2. Perform each action (1,2,3) once 3. Select 4 (Exit) | `DataProgram` read/write called appropriately, balance updated per operation | | | |
| TC-008 | Data is in-session only | App restarted | 1. Start app 2. Credit amount 200 3. Exit 4. Restart app 5. View balance 6. Exit | Balance resets to 1000.00 (in-memory state lost on exit) | | | |

> Notes: For each test, stakeholders should capture the actual output shown by the COBOL program and set Status accordingly.
