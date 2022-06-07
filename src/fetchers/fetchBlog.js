export default async function fetchBlog(id) {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/blogs/blog/${id}`
  );
  if (!response.ok) {
    throw new Error("Could not fetch blog page");
  }
  return response.json();
}
