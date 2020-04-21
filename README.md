# Multiplayer web game application: boilerplate code - Client side

This repo comprises the client side of a multiplayer web game web platform. This project has been built to act as boilerplate for others to use for making their own games. It has been written using React, Socket.io and Node.js.

In order for the websockets to work, the client side relies on the server side. You will need to clone and 'npm start' the server side aspect of this project from here: https://github.com/jcraggs/XXXXX

Current features of the web app:

- Quick and easy method of joining game rooms, no need for accounts or signing up!
- Real time messaging component, hideable by clicking on the drop down arrow.
- Built in, componentised burger menu; easy to expand upon based on future needs. The menu comes with three example tabs:
  - A list of all the current players in the room
  - A text based tab of game rules
  - A dual column style tab of game controls
- Responsive design, working well in both desktop and mobile devices.

The messaging component of this application has been built with the help of the following tutorial: https://www.youtube.com/watch?v=ZwFA3YMfkoc by [Adrian Hajdin](https://github.com/adrianhajdin/project_chat_application). Watching the video is highly recommended in order to help you understand websockets and how they can be leveraged for a multiplayer game component.

The example web application is hosted here: https://xxxxxxxx.netlify.com/

Note the application has been built with Chrome on desktop and Safari on iOS. Performance on other browsers and devices has not been tested.

## Who is this repo for?

This repo is for people who have moderate experience of React and don't want to have to sort out all the styling and peripheral components required for a responsive and an easy to use multiplayer web game platform. The only component that you really need to focus on is the actual game.

## To run this project locally:

1. Click on the repo's "Clone or Download" button link and copy the URL (https://github.com/jcraggs/XXXXXXX.git)
2. Navigate to where you'd like the application to be copied in your command line and write:

   ```
   git clone https://github.com/jcraggs/XXXXXXX.git
   ```

3. Navigate to the newly-created folder in your command line interface and type `npm install` to install all dependencies.

4. To run the client side, simply type the comment `npm start`.

## React App component structure:

```raw
App                      --> Where our two routes are defined
│
├── Join                 --> Landing page when a user first visits the site
│
├── Main                 --> The main component for our app once a user has joined a room
│
├── NavBar               --> Houses the back arrow (to quit the current room) and burger menu
│
├── BurgerMenu           --> Clickable element that contains the various options and information panels
│   ├── MenuItem         --> Reusable menu element which takes the input of a content component from MenuContent
│   └── MenuContent
│        ├── ControlList --> Simple two column component showing the controls of the game
│        ├── HowToPlay   --> Text component explaining the rules of the game
│        └── OnlineUsers --> List component showing the players currently online
│
├── Game                 --> The game component placeholder for other projects to edit
│
└── Chat
    ├── InfoBar          --> Shows the current room and an online indicator, is a hideable element
    ├── MessageList      --> Component which loops over all the messages stored in the chat array
    │    └── Message     --> Single message component, renders blue or grey depending on which user is viewing it
    │
    └── ChatInput        --> Input component for typing and sending messages
```

## Hosting:

The example application has been deployed to [Netlify](https://www.netlify.com/). For further instructions on how to deploy a web application on Netlify see the "howToDeploy.md" file within this repo.
