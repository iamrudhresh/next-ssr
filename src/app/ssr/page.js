// app/ssr/page.js
export default async function SSRPage() {
    console.log('Fetching data from API on the server...'); // Log request on server
  
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      cache: 'no-store',
    });
    const post = await res.json();
  
    return (
      <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <h1>Server-Side Rendering in Next.js</h1>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    );
  }
  