# edalex client
----------------
Project overview
----------------
This project is a simple website that implements material-ui by using react and typescrip. 
The website can communicate with server (RESTful WS) to get, post, delete message.

-- Project structure --

|-public
|	|-index.html
|-scr
|	|-_tests_
|	|	|-InfoDialog.test.tsx
|	|	|-MainBody.test.tsx
|	|	|-Notification.test.tsx
|	|	|-TableView.test.tsx
|	|-api
|	|	|-ApiClient.tsx
|	|	|-MessageEntity.tsx
|	|-components
|	|	|-App.tsx
|	|	|-AppBar.tsx
|	|	|-InfoDialog.tsx
|	|	|-MainBody.tsx
|	|	|-Notification.tsx
|	|	|-TableView.tsx
|	|	|-theme.tsx
|	|-index.tsx
|-jest.config.js
|-package.json
|-README.md
|-tsconfig.json
|-tsconfig.prod.json
|-tslint.json

-------------------
Develop environment
-------------------
- Language: React with Typescript
- IDE: Atom
- Other dependences: material-table; axios; material-ui

Install the Node dependencies:
    npm install

Start the local dev server/build environment:
    npm run start

--------
Testing
--------
Using "React testing library" with "Jest" for unit test and e2e test
Uisng axios-mock-adapter to mock server

Install jest as a dev dependency.
	npm install --save-dev jest

Run jest testing
	npm run test
	npm run test:watch

----------
Versioning
----------
Using Git for version control

-------
License
-------
Edalex
