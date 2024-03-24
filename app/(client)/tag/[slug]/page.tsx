import { Post } from "@/app/utils/interface";
import Header from "@/components/Header"
import Posts from "@/components/Posts";
import { client } from "@/sanity/lib/client"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";


async function getAllPostsByTag(tag:string) {
  const query = `
    *[_type == "post" && references(*[_type == "tag" && slug.current == "${tag}"]._id)] {
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
  `
  const posts = await client.fetch(query);
  return posts;
}

const page = async ({params}: Params) => {
  const postsByTag: Array<Post> = await getAllPostsByTag(params.slug);
  console.log(postsByTag);
  return (
    <div>
      <Header title={params?.slug.replace(/[-]/g, ' ')} />
      {
        postsByTag?.length > 0 && postsByTag.map((post) => (
          <Posts key={post._id} post={post} />
        ))
      }
    </div>
  )
}

export default page
