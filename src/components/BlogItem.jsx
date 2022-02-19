import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import classes from "./BlogItem.module.css";
const BlogItem = (props) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/${props.id}`);
  };
  return (
    <Card className={classes.card} onClick={clickHandler}>
      <h1>{props.title}</h1>
      <h3>{props.author.firstName + " " + props.author.lastName}</h3>
      <p>{props.description}</p>
    </Card>
  );
};
export default BlogItem;
