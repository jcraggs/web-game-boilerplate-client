# Multiplayer web game application: boilerplate code - Client side

**The example web application is hosted here: https://web-game-boilerplate.netlify.app/**

This repo comprises the client side of a multiplayer web game web platform. This project has been built to act as boilerplate for others to use for making their own games. It has been written using React, Socket.io and Node.js.

In order for the websockets to work, the client side relies on the server side. You will need to clone and 'npm start' the server side aspect of this project from here: https://github.com/jcraggs/web-game-boilerplate-server

Current features of the web app:

- Quick and easy method of joining game rooms, no need for accounts or signing up!
- Real time messaging component, hideable by clicking on the drop down arrow.
- A lobby for players to gather in prior to the game start.
- Ability to control number of user connections per room (default is 4; set in the backend).
- Built in, componentised burger menu; easy to expand upon based on future needs. The menu comes with three example dropdowns:
  - A list of all the current players in the room
  - A text based tab of game rules
  - A dual column style tab of game controls
- Responsive design, working well in both desktop and mobile devices.

The messaging component of this application has been built with the help of [this tutorial](https://www.youtube.com/watch?v=ZwFA3YMfkoc) by [Adrian Hajdin](https://github.com/adrianhajdin/project_chat_application). Watching the video is highly recommended in order to help you understand websockets and how they can be leveraged for a multiplayer game component.

Note the application has been built with Chrome on desktop and Safari on iOS. Performance on other browsers and devices has not been tested.

## Who is this repo for?

This repo is for people who have moderate experience of React and don't want to have to sort out all the styling and peripheral components required for a responsive and an easy to use multiplayer web game platform. The only component that you really need to focus on building is the actual game.

## To run this project locally:

1. Click on the repo's "Clone or Download" button link and copy the URL (https://github.com/jcraggs/web-game-boilerplate-client.git)
2. Navigate to where you'd like the application to be copied in your command line and write:

   ```
   git clone https://github.com/jcraggs/web-game-boilerplate-client.git
   ```

3. Navigate to the newly-created folder in your command line interface and type `npm install` to install all dependencies.

4. To run the client side, simply type the comment `npm start`.

## Tips for developing this project:

In order to link the client side to your back end make sure to correctly define the `ENDPOINT` constant in the Main.js file. It should be "localhost:5000" if you are using your locally hosted back end or the url where the back end has been hosted online (e.g. on Heroku).

In order to view development features on a mobile device (by navigating to the locally hosted react app 192.168.1.\*\*\*:3000 ip address) when hosting the back end locally you'll have to overwrite the `showContentBool` to true and the `loading` to false in the Main.js file. If you don't do this it will hang on the loading spinner as the sockets won't be working.

## React App component structure:

```raw
App                         --> Where our two routes are defined
│
├── Join                    --> Landing page when a user first visits the site
│
├── RoomFull                --> Pop-up modal for when a user attemps to join a full room
│
├── Loading                 --> Small spinner for when the app is transitioning from login to the main page
│
├── Main                    --> The main component for our app once a user has joined a room
│
├── NavBar                  --> Houses the back arrow (to quit the current room) and burger menu
│
├── BurgerMenu              --> Clickable element that contains the various options and information panels
│   ├── MenuItem            --> Reusable menu element which takes the input of a content component from MenuContent
│   └── MenuContent
│        ├── ControlList    --> Simple two column component showing the controls of the game
│        ├── HowToPlay      --> Text component explaining the rules of the game
│        └── OnlineUsers    --> List component showing the players currently online
│
├── Game                    --> The game component made by other projects should go in here
│   └── ReadyPlayers        --> A lobby for players to gather in prior to the start of the game
│       ├── ShareLinkPopup  --> A pop-up notifying the user the shareable link is copied to their clipboard
│       └── ReturnToLobby   --> A pop-up notifying users why the game ended upon their return to lobby
│
└── Chat
    ├── InfoBar             --> Shows the current room and an online indicator, is a hideable element
    ├── MessageList         --> Component which loops over all the messages stored in the chat array
    │    └── Message        --> Single message, renders blue or grey depending on which user is viewing it
    │
    └── ChatInput           --> Input component for typing and sending messages
```

## Hosting:

The example application has been deployed to [Netlify](https://www.netlify.com/). For further instructions on how to deploy a web application on Netlify see the "howToDeploy.md" file within this repo.
