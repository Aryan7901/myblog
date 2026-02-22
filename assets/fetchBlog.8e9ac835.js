async function n(t){const o=await fetch(`https://aryan-api.771727.xyz/blog-mania/blogs/blog/${t}`);if(!o.ok)throw new Error("Could not fetch blog page");return o.json()}export{n as f};
