# **Next.js Server-Side Rendering (SSR) Guide**

This guide explains how to implement **Server-Side Rendering (SSR)** in Next.js using both:
1. **Pages Router (`pages/` directory) - Uses `getServerSideProps`**
2. **App Router (`app/` directory) - Uses Server Components**

---

## **📌 1. SSR with Pages Router (`pages/` directory)**

**How it Works:**
- You define a function called `getServerSideProps`.
- This function runs **on every request**, fetches data on the **server**, and sends it to the page as props.

### **Step 1: Create a Page with `getServerSideProps`**

Create a new file **`pages/ssr.js`**:

```jsx
export async function getServerSideProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const post = await res.json();

  return {
    props: {
      post, // Data is passed to the component as props
    },
  };
}

export default function SSRPage({ post }) {
  return (
    <div>
      <h1>Server-Side Rendering with getServerSideProps</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}
```

### **Step 2: Run the Project & Test SSR**

1. Start the server:
   ```bash
   npm run dev
   ```
2. Open **http://localhost:3000/ssr** in your browser.
3. The page will show **pre-rendered data** fetched on the server.
4. Refresh the page and check **Network Tab → Fetch/XHR**. You **won’t see the fetch request** because it happens on the server before the page loads.

---

## **📌 2. SSR with App Router (`app/` directory)**

**How it Works:**
- Server Components are used **by default**.
- You can directly fetch data inside the component **without `getServerSideProps`**.

### **Step 1: Create an SSR Page in `app/ssr/page.js`**

Create a new file **`app/ssr/page.js`**:

```jsx
export default async function SSRPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    cache: 'no-store', // Ensures fresh data on every request
  });
  const post = await res.json();

  return (
    <div>
      <h1>Server-Side Rendering in Next.js App Router</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}
```

### **Step 2: Run the Project & Test SSR**

1. Start the server:
   ```bash
   npm run dev
   ```
2. Open **http://localhost:3000/ssr** in your browser.
3. The page will **load pre-rendered data**.
4. Refresh the page and **check the Terminal logs** (since it runs on the server).

---

## **🔍 Key Differences Between Pages Router & App Router**

| Feature | `getServerSideProps` (Pages Router) | Server Components (App Router) |
|---------|----------------------------------|----------------------------|
| **Where does it work?** | `pages/` directory | `app/` directory |
| **How is data fetched?** | In `getServerSideProps` function | Directly in the component |
| **Fetch Request Visible in DevTools?** | ❌ No (happens before page loads) | ❌ No (happens before page loads) |
| **Revalidation Support?** | ❌ No (always fetches fresh data) | ✅ Yes (`revalidate: 10`) |
| **Recommended for new projects?** | ❌ No (old approach) | ✅ Yes (modern approach) |

---

## **🚀 When to Use SSR?**
✅ **Use SSR (`cache: 'no-store'`) when:**
- You need **real-time data** (e.g., live stock prices, latest news).
- You want **fresh content on every request**.
- You need **SEO benefits**.

✅ **Use ISR (`revalidate: 10`) when:**
- You want to fetch **dynamic data** but allow caching for a short time.
- Example:
  ```jsx
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    next: { revalidate: 10 }, // Fetch fresh data every 10 seconds
  });
  ```

---

## **🎯 Conclusion**
✅ **If you are starting a new Next.js project, use the App Router (`app/`).**
❌ **If you are working with an old project (`pages/`), `getServerSideProps` is required.**

Would you like to add an interactive **Client Component** that fetches new data dynamically? 🚀

