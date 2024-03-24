import Link from "next/link"
import { Lilita_One, VT323 } from "next/font/google";
import { Post } from "@/app/utils/interface"
import clsx from "clsx";

interface Props {
  post: Post;
}


const lilitaOne = Lilita_One({weight: "400", subsets: ["latin"]});
const vt323 = VT323({weight: "400", subsets: ["latin"]});

const Posts = ( { post }: Props) => {
  return (
    <div className={postStyle}>
      <Link href={`/posts/${post?.slug?.current}`}>
        <h2 className={clsx(lilitaOne.className, 'text-2xl')}>{ post?.title }</h2>
        <p className={clsx(vt323.className, 'my-2 text-primary')}> { 
            new Date(post?.publishedAt).toDateString()
          }
        </p>
        <p className=""> { post?.excerpt } </p>
      </Link>
      {/* Tags */}
      <div>
        {
          post?.tags?.map((tag) => (
            <span
              key={tag._id}
              className="mr-2 p-1 rounded-sm text-sm lowercase"
            >
                #{tag.name}
            </span>
          ))
        }
      </div>
    </div>
  )
}

export default Posts

const postStyle = `
  mb-8
  p-4
  border
  rounded-md
  shadow-sm
  shadow-foreground
  hover:shadow-md
  bg-card
  dark:shadow-md
  dark:shadow-ring
  hover:dark:shadow-lg
`
