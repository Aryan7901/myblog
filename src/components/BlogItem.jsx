import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import classes from "./BlogItem.module.css";
const BlogItem = (props) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/${props.id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateReadTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <Card className={classes.card} onClick={clickHandler}>
      <div className={classes.cardContent}>
        <div className={classes.meta}>
          <span className={classes.author}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            {props.author.firstName + " " + props.author.lastName}
          </span>
          {props.createdAt && (
            <>
              <span className={classes.dot}>•</span>
              <span className={classes.date}>{formatDate(props.createdAt)}</span>
            </>
          )}
        </div>
        <h2 className={classes.title}>{props.title}</h2>
        <p className={classes.description}>{props.description}</p>
        <div className={classes.footer}>
          <span className={classes.readTime}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {calculateReadTime(props.description)}
          </span>
          <span className={classes.readMore}>
            Read more
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </div>
    </Card>
  );
};
export default BlogItem;