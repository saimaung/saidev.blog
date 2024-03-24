import Header from "@/components/Header";
import { client } from "@/sanity/lib/client";
import { Post } from "../utils/interface";
import Posts from "@/components/Posts";

async function getPosts() {
  const query = `
  *[_type == "post"] {
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    tags[]-> {
      _id,
      slug,
      name,
    },
    _id,
  }
  `;
  const posts = await client.fetch(query);
  return posts;
}

// caching - refetch in 60 seconds
export const revalidate = 60;

export default async function Home() {
  const posts: Post[] = await getPosts();
  return (
    <div>
      <Header title="Articles"/>
      <div>
        {posts?.length > 0 && posts.map(post => (
          <Posts 
            key={post._id}
            post={post}
          />
        ))}
      </div>
    </div>
  );
}
