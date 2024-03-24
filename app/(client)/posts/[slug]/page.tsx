import { Post } from "@/app/utils/interface";
import Header from "@/components/Header";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import clsx from "clsx";
import { VT323 } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";

const vt323 = VT323({weight: "400", subsets: ["latin"]});

async function getPost(slug: string) {
  const query = `
  *[_type == "post" && slug.current == "${slug}"][0] {
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
  const post = await client.fetch(query);
  return post;
}

interface Params {
  params: {
    slug: string;
  }
}

const page = async ({params}: Params) => {
  const post: Post = await getPost(params?.slug);
  return (
    <div>
      <Header title={post?.title}/>
      <div className="text-center">
        <span className={clsx(vt323.className, 'text-primary')}>
          {new Date(post?.publishedAt).toDateString()}
        </span>
        <div className="mt-5">
          {post?.tags?.map((tag) => (
            <Link 
              key={tag?._id}
              href={`/tag/${tag?.slug?.current}`}
            >
              <span className="mr-2 p-1 rounded-sm text-sm lowercase">
                #{tag?.name}
              </span>
            </Link>
          ))
          }
        </div>
        
        <div className={richTextStyles}>
          <PortableText 
            value={post?.body}
            components={components}
          />
        </div>
      
      </div>
    </div>
  )
}

export default page

const richTextStyles = `
  mt-14
  text-justify
  max-w-2xl
  m-auto
  prose-headings:my-5
  prose-heading:text-2xl
  prose-p:mb-5
  prose-p:leading-7
  prose-li:list-disc
  prose-li:leading-7
  prose-li:ml-4
  prose-code
`

const ImageComponent = ({ value }: any) => {
  return (
    <Image
      src={urlForImage(value)}
      alt={value.alt || ' '}
      width={700}
      height={700}
    />
  )
}

const components = {
  types: {
    image: ImageComponent,
    // Any other custom types you have in your content
    // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
  },
}
