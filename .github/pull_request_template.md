

## What

- a details page displaying an issue's description, user name and email, current status and message(s) regarding it 
- there it is possible to update the issue status and write a message describing it
- the user can leave an email address to receive the updated status of a posted issue


## Why

- the feature makes the app more interactive, by allowing the admin to update the status of a submitted issue and writing a message summarizing it
- this way, the user is keeped up to date about the submitted issue
- it is also a way for the municipality of improving the quality of service, as it will be possible to check the history of each issue and estimate, for example, the average time to solve one

## How

- database: 
- (a) create a migration in the Issue model to add the field "userEmail" (string)
- (b) create a new model: "IssueStatus", with "issueId" (foreign key), "status" (string), "message"(idem), and "createdAt"(date)

- user form: add a new field "email"
- create a details page for each issue in the route `/admin/issues/[issueId].js`
- this page shows the admin the current status and previous messages (if existing)
-  there is also a selector to change the status, and an input field to type the message
- when clicking the "submit" button, the admin will make a POST request to the DB and insert a new entry in the IssueStatus table, and also send the user a template email containing (a) the users name, (b) the issue number, (c) the status and (d) the message
- create an email template to be sent to and keep the user up to date

## What infrastructure did you set up (step by step process descrition)

- we're using a Prisma server for the DB requests
- the detais page uses `getServerSideProps()` so that the admin has the updated history of a given issue everytime he/she has access to it
- we'll keep using NextJS/React to build the application, and react-hook-form for validation
- we'll use the Figma design and CSS modules to style the details page


## Steppings to test this

- to test it, we should click upon an existing issue in the `/admin` page, that should lead to the `/admin/issues/[userId].js` page
- this page must have the info of the selected issue, plus a selector of the status ("submitted", "additional info needed", "on progress", and "solved")
- there must be also an input field for the message describing what step has being taken, and a "submit" button to update the status and send the user an update email 
- the page should be up to date, displaying the selected status and the message, right after the submission, and the user should receive an email

## Anything else

- should we leave the part of the user email (form field and template email to be sent after the admin updates the issue's status) for a later moment?
- how could we avoid the email sent to the user being blocked as perceived as span?
- how can we avoid being spanned by malicious users sending non pertinent issues?
