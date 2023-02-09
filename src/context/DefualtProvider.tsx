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
  showLightTheme: true,
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
