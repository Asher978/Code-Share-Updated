# Group Project: Code-Share

General Assembly WDI NYC
August, 2107

[Code-Share Link](https://mysterious-anchorage-20913.herokuapp.com/)

#### The Master Minds
- Mitchel Severe 
- Mili Neykkova
- Asher Shaheen

![code-share](https://thumbs.gfycat.com/DirtyPlasticAndeancat-max-1mb.gif)

## Description 
Code Share is a platform that provide Groups an ability to code together without being together in one place. The app has an option to work on coding challenges which include _TESTS_ or to work/share individual code collabratively. Users can also save the writen code in a JS format for their reference. The app provides a _CODE EDITOR_ sourced from another NPM PACKAGE _CODEMIRROR_. The app also provides a feature where USERS can find coding events based on the USER input language. USERS will also be able to create their own events. These events are viewable by all USERS. The app has a feature for _AUTHS_ thus enabling the USERS to create a unique profile.

## User Stories ( M V P )
  *  USER should be able to create a USER NAME ( NO AUTHS )
  *  USER should be able to view the coding challenges & the events on the main page
  *  USER should be able to select a challenge followed by a render of code editor for that challenge in a specific ROOM
  *  USER should be able to SAVE the code by an option of DOWNLOAD
  *  USER should be abe to view who is in the ROOM and who is typing should show
  *  USER should be able to CREATE or SEARCH coding events based on the language they provided

## BONUS FEATURES (All Accomplished)
  - [x] AUTHS - option to REGISTER and LOGIN
  - [x] CHAT window in the ROOMS 
  - [x] Providing tests for the code challenges 

## Our Approach
We utilized React.js for the UI. Socket.io was utilized on both sides the front and back end in order to keep sync with the server and the user. All of our API calls are being inititated from the server side to protect the API Keys. Code writen by users is being sent to the server via POST request and is being executed in a sandbox _ENV_. We utilized the CRUD functionality by giving the users an option to create their own events that are viewable to all users.  

## Link to Wire Frames
[WireFrames](https://github.com/Asher978/code_share/blob/master/wireframe.md)

## Sourced Technologies                  
- [x] React.js
- [x] Node.js
- [x] Express
- [x] Socket.io
- [x] PSQL
- [x] JSX
- [x] BootStrap
- [x] Passport / Sessions

## Sourced NPM Packages Outside of Our Course
- [x] Socket.io (Enabling Realtime. Connected with the chat box and code editor so all users see real time updates on all connected sockets)
- [x] Moment & Moment-Duration-Format (Parsing Dates & Times received from API Response)
- [x] Codemirror (React Code Editor Component. Set to be used in JS Language only)
- [x] VM (Sandbox For Code Evaluation. To execute user code in its own ENV without effecting our own App's EVN)
- [x] Chai, Expect, Assert & Check-Error (User Code Testing & Error Handlings)
- [x] File-Saver (Option to download the User code in JS format)

## 3rd Part API
- [x] Google (Provided Lat & Lng from User Input ZIP)
- [x] Meetup (Provided Events on requested ZIP CODE)

## Code Snipets

<details>
<summary>Code Eval (Backend)</summary>

```
const vm = require('vm');
const assert = require('assert');
const expect = require('chai').expect;
const chai = require('chai');
const checkError = require('check-error');

// evaluation of code with challenges and testing
let codeEval = (req, res, next) => {
    let result;
    let code = req.body.code;

    const sandbox = { assert: assert, expect: expect, checkError: checkError, chai: chai };
    vm.createContext(sandbox);
    try {
        result = vm.runInContext(code, sandbox);
        res.locals.ref = result;  
    } catch (e) {
        result = checkError.getMessage(e);
        res.locals.ref = result;
    }
    next();
}

```
</details>

<details>
<summary>Code Eval (Front End)</summary>

```
// evaluating the code from the editor and setting state of the result
  handleExecuteCode = (code, test) => {
    if(code + test) {
      axios.post('/code', {
        code: code + test,
      }).then(res => {
        let obj = res.data.data;
        console.log('frontend received--->', obj)
        if (obj.__flags) {
          this.setState({ codeResult: 'Nice Work! Test Passed!', alert: 'success' })
        } else {
          this.setState({ codeResult: 'Error: ' + res.data.data, 'alert': 'danger' })
        }
        socket.emit('test check', this.state.codeResult);
      }).catch(err => console.log(err));
    }    
  }
```
</details>


<details>
<summary>Socket.io</summary>

```
FRONT END
componentWillMount() {
    this.props.user ? 
      socket.emit('user join', this.props.user) : 
    console.log('Null user');
  }

  componentDidMount() {
    socket.on('user join', this.handleUsers);
    socket.on('message', this.handleRecievedMessage);
    socket.on('code', this.handleCodeFromSockets);
    socket.on('checked', this.codeResultCheck);
  //   socket.on('leave', this.handleLeaveUser);
  }

  handleUsers = (users) => {
    this.setState({users: users}); 
  }

  handleCodeFromSockets = (code) => {
    this.setState({code: code});
  }

  codeResultCheck = (result) => {
    this.setState({codeResult: result});
  }

  handleUpdateCodeState = (text) => {
    socket.emit('coding', text);
    this.setState({code: text});
  }

  handleRecievedMessage = (message) => {
    let messages = this.state.messages;
    messages.push(message);
    this.setState({messages: messages});
  }

  handleMessageSubmit = (message) => {
    socket.emit('send message', message);
  }

  BACK END
  io.on('connection', (socket) => {
  console.log('A new connection', socket.id);

  socket.on('send message', (message) => {
    messages.push(message);
    io.emit('message', {
      user: message.user,
      text: message.text,
    });
  });

  socket.on('user join', (user) => {
    if (users.indexOf(user) === -1) {
      users.push(user);
      console.log(users);
    } else console.log('already exist');  
    io.emit('user join', users);
  });

  socket.on('coding', (code) => {
    socket.broadcast.emit('code', code);
  });

  socket.on('test check', (result) => {
    io.emit('checked', result);
  });
});
```
</details>

## ERDs

Events  |  Type  |
---  |  ---  |
ID  |  SERIAL PRIMARY KEY
Title  |  VARCHAR(255)
Desc  |  TEXT
date  |  DATE
time  |  TIME
user_id  |  INTEGER REFERENCES users(id)

Users  |  Type  | 
---  |  ---  |
ID  |  SERIAL PRIMARY KEY
username  |  VARCHAR(255) UNIQUE NOT NULL
password_digest  |  TEXT NOT NULL
email  |  VARCHAR(255) UNIQUE NOT NULL
firstname  |  TEXT NOT NULL
lastname  |  TEXT NOT NULL

## Snap Shot of File Structure (Front End & Back End)
<details>
<summary>Front End</summary>

```
|_ client
    |_ node_modules
    |_ public
    |_ src
        |_ challenges (JS file containing an array of challenges)
        |_ components
        |    |_ ApiEventList.jsx
        |    |_ ChallengesList.jsx
        |    |_ Chat.jsx
        |    |_ CodeEditor.jsx
        |    |_ EventAddForm.jsx
        |    |_ EventList.jsx
        |    |_ Footer.jsx
        |    |_ Home.jsx
        |    |_ Login.jsx
        |    |_ MainNav.jsx
        |    |_ NotLoggedNav.jsx
        |    |_ Register.jsx
        |    |_ SingleChallenge.jsx
        |__ App.js
        |__ App.css
        |__ index.js
        |__ index.css
```
</details>
<details>
<summary>Back End</summary>


```
|_ controllers
|  |_ events-controller.js
|  |_ users-controller.js
|
|_ db
|  |_ migrations
|  |  |_ migration-082117.sql
|  |_ config.js
|
|_ models
|  |_ events.js
|  |_ user.js
|
|_ routes
|  |_ auth-routes.js
|  |_ code-routes.js
|  |_ event-routes.js
|  |_ meetup-routes.js
|  |_ user-routes.js
|
|_ services
|  |_ auth
|  |  |_ auth-helpers.js
|  |  |_ local.js
|  |  |_ passport.js
|  |
|  |_ code
|  |  |_ code-helper.js
|  |
|  |_ meetup
|    |_ meetup-helper
|
|_ app.js

```

</details>

## Installation Instructions
  *  Yarn install from the _MAIN PROJECT FOLDER & THE CLIENT FOLDER_ to install all dependencies
  *  Few Changes need to happen before you start servers:
    *  In _Client/src/components_ two files need an update. (SingleChallenge.jsx & CodeEditor.jsx) Please make the following change to line # 26 in both files.  

    ```
    const socket = io.connect();

    // change to 

    const socket = io.connect('http://localhost:3001');

    // save and run servers after this change
    
    ```

## Road Blocks

![RoadBlocks](http://apps.frontline.org/police-stops/img/indianapolis.gif)

  *  Getting the tests to work in the _SANDBOX ENV_ especially having 4 different NPM Packages work together
  *  Sockets.io to update and reflect the changes once a new USER joins the room
  *  Redirecting to HOME page after a USER logs in

## Loose Ends
  *  When a new EVENT is created by a USER, the change should reflect without refreshing the page
  *  Integrating Mocha Tests for the challenges

## Planned improvements / Bugs Fixes

[List of Bugs / Future Improvements](https://github.com/Asher978/code_share/projects/2)

  * Have an idea or a solution to the current bugs. Open up a PR and share.