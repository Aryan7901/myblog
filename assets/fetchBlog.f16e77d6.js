async function t(n){const o=await fetch(`https://blogmania.onrender.com/blogs/blog/${n}`);if(!o.ok)throw new Error("Could not fetch blog page");return o.json()}export{t as f};
