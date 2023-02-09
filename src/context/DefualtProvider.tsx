import { createContext, ReactNode, useState } from "react";

export interface DefualtProviderProps {
  children: ReactNode;
}

export interface Document {
  id: string;
  name: string;
  createdAt: string;
  content: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  timeout: number;
  type: "info" | "error";
  component?: ReactNode;
}

const OnbordingAction = () => {
  return (
    <div className="onboardign-action">
      <p>onboarding actions</p>
    </div>
  );
};

const defualtDocuments = [
  // {
  //   id: "YUVcPsqKROynBjCANjWGm",
  //   name: "README",
  //   createdAt: "Aug 27, 2022",
  //   content:
  //     "# Frontend Mentor - In-browser markdown editor solution\n\nThis is a solution to the [In-browser markdown editor challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/inbrowser-markdown-editor-r16TrrQX9). Frontend Mentor challenges help you improve your coding skills by building realistic projects. \n\n## Table of contents\n\n- [Overview](#overview)\n  - [The challenge](#the-challenge)\n  - [Screenshot](#screenshot)\n  - [Links](#links)\n- [My process](#my-process)\n  - [Built with](#built-with)\n  - [What I learned](#what-i-learned)\n  - [Continued development](#continued-development)\n  - [Useful resources](#useful-resources)\n- [Author](#author)\n\n## Overview\n\n### The challenge\n\nUsers should be able to:\n\n- Create, Read, Update, and Delete markdown documents\n- Name and save documents to be accessed as needed\n- Edit the markdown of a document and see the formatted preview of the content\n- View a full-page preview of the formatted content\n- View the optimal layout for the app depending on their device's screen size\n- See hover states for all interactive elements on the page\n- **Bonus**: If you're building a purely front-end project, use localStorage to save the current state in the browser that persists when the browser is refreshed\n- **Bonus**: Build this project as a full-stack application\n\n### Screenshot\n\n![screenshot](https://github.com/remyboire/markdowneditor/blob/main/screenshot.jpg?raw=true)\n\n### Links\n\n- Solution URL: [Github](https://github.com/remyboire/markdowneditor)\n- Live Site URL: [Github Page](https://remyboire.github.io/markdowneditor/)\n\n## My process\n\n### Built with\n\n- [React](https://reactjs.org/) - JS library\n\n\n### What I learned\n\nI took [Bob's Ziroll](https://twitter.com/bobziroll) amazing [Learn React Course](https://scrimba.com/learn/learnreact) on scrimba last week and this challenge was perfect for me to practice every notion I learned. I was the first time I build a React app from scratch and I learned a lot about components, props, states, localstorage, effects, dark mode (even if I didn't spend much time on it) etc.\nI tried to add a few functionalities like the possibility to download your document once saved, or delete a doc by clicking the icon on the sidebar (when the sidebar is open, the button in the header was hidden).\n\n\n### Continued development\n\nI didn't care much about CSS and I feel like my code isn't very great, but it wasn't the purpose of this challenge for me. In the future, when I'll forget about my code,  I'd like to rework on this project to improve it and see if it's clear enough for someone else. I use React-mde package and would like to replace it and code my own solution for the editor. \nSaving with cmd+S would be a nice little feature to add too.\n\n### Useful resources\n\n- [Scrimba - learn react for free](https://scrimba.com/learn/learnreact) - This course is very great and really fits my learning method.\n\n## Author\n\n- Website - [Rémy Boiré](https://www.remyboirefr)\n- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/remyboire)\n\n",
  // },
  {
    id: "YUVcPsqKROynBadCANjWGm",
    name: "welcome",
    createdAt: "Aug 27, 2022",
    content:
      "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```",
  },
];

const defualtNotificactions: Notification[] = [
  {
    id: 0,
    title: "Welcome",
    message: "Welcome to the Online Markdown Editor",
    timeout: 3000,
    type: "info",
  },
  {
    id: 1,
    title: "Onboarding",
    message:
      "If you are new would you like to go through the onbording process",
    timeout: 3000,
    type: "info",
    component: <OnbordingAction />,
  },
];

export interface InitialDefualtStateProps {
  showSidebar: boolean;
  showLightTheme: boolean;
  showEditor: boolean;
  documents: Document[];
  currentDocument: Document;
  notifications: Notification[];
  displayContent: string;
}

export interface InitialModalStateProps {
  showModal: boolean;
  component: ReactNode | null;
}

const InitialmodalState: InitialModalStateProps = {
  showModal: false,
  component: null,
};

const InitialState: InitialDefualtStateProps = {
  // sidebar
  showSidebar: false,
  showLightTheme: false,
  showEditor: true,
  documents: defualtDocuments,
  currentDocument: defualtDocuments[0],
  notifications: [...defualtNotificactions],
  displayContent: "",
};

interface ContextProps {
  state: InitialDefualtStateProps;
  setState: (state: InitialDefualtStateProps) => void;

  modalState: InitialModalStateProps;
  setModalState: (modalState: InitialModalStateProps) => void;
}

export const DefualtContext = createContext<ContextProps>({
  state: InitialState,
  setState: (state) => state,

  modalState: InitialmodalState,
  setModalState: (modalState) => modalState,
});

export const DefualtProvider = (props: DefualtProviderProps) => {
  const [state, setState] = useState(InitialState);
  const [modalState, setModalState] = useState(InitialmodalState);

  return (
    <DefualtContext.Provider
      value={{ state, setState, modalState, setModalState }}
    >
      {props.children}
    </DefualtContext.Provider>
  );
};

export default DefualtContext;
