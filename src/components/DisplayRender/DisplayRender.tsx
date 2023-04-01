import useDefaultContext from "../../hooks/useDefualtContext";
import "./display-render.scss";

const DisplayRender = () => {
  const { state } = useDefaultContext();

  console.log(state.displayContent);

  return (
    <div
      className={`display-render ${state.showLightTheme ? "light" : "dark"}`}
      dangerouslySetInnerHTML={{ __html: state.displayContent }}
    ></div>
  );
};

export default DisplayRender;
