async function e(t){const o=await fetch(`https://blogaryan.herokuapp.com/blogs/blog/${t}`);if(!o.ok)throw new Error("Could not fetch blog page");return o.json()}export{e as f};
