export const post = {
  name: "post",
  title: "Post",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" }
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime"
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text"
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block", },
        {
          type: "image", 
          fields: [{ type: "text", name: "alt", title: "Alt"}]
        }
      ]
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [ { type: "reference", to: [{type: "tag"}]} ]
    }
  ]
}