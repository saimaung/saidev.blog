import { Tag } from "@/app/utils/interface";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { client } from "@/sanity/lib/client"
import Link from "next/link";

async function getAllTags() {
  const query = `
  *[_type == "tag"] {
    name,
    slug,
    _id
  }
  `
  const tags = client.fetch(query);
  return tags;
}

export const revalidate = 60;

const page = async () => {
  const tags: Tag[] = await getAllTags();
  console.log(tags, 'tags')
  return (
    <div>
      <Header title="tags" />
      {
        tags?.length > 0 && tags?.map( (tag) => (
          <Link key={tag?._id} href={`/tag/${tag.slug.current}`}>
            <div className="mb-2 p-2 lowercase border hover:text-primary">
              #{tag.name}
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default page
