import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container } from "@mantine/core";
import { defer, useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import { Loader } from '@mantine/core';

export const PostPage = () => {
  const data = useLoaderData();

  return (
    <Container>
      <SimpleGrid cols={3}>
        <Suspense fallback={  <p>Hello</p>}>
          <Await errorElement={<p>error</p>} resolve={data.posts}>
            {(posts) => {
              console.log(posts);

              {
                posts.map((post) =>
                  // console.log(post)
                  <ArticleCardImage key={post.title} {...post} />
                );
              }
            }}
          </Await>
        </Suspense>
      </SimpleGrid>
    </Container>
  );
};

// async function datapost() {
//   const res = await axios.get(`${DOMAIN}/api/posts`);
//   const jsonData = res.data;
//   return jsonData;
// }

export const postsLoader = async () => {
  return defer({
    posts: axios.get(`${DOMAIN}/api/posts`).then(res => res.data)
  });
};

// import DOMAIN from "../../services/endpoint";
// import axios from "axios";
// import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
// import { SimpleGrid, Container } from "@mantine/core";
// import { useLoaderData } from "react-router-dom";

// export const PostPage = () => {
//   const posts = useLoaderData();

//   return (
//     <Container>
//       <SimpleGrid cols={3}>
//         {posts.map((post) => (
//           <ArticleCardImage key={post.title} {...post} />
//         ))}
//       </SimpleGrid>
//     </Container>
//   );
// };

// export const postsLoader = async () => {
//   const res = await axios.get(`${DOMAIN}/api/posts`);
//   return res.data;
// };
