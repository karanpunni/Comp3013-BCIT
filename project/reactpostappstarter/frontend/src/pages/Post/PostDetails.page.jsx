import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
} from "@mantine/core";
import classes from "./PostDetails.module.css";



function PostDetailsPage() {
  const postsDetail = useLoaderData();

  const mockdata = {
    image:postsDetail.image,
    author: postsDetail.id,
    title: postsDetail.title,
    content: postsDetail.content,
    category: postsDetail.category,
  };


  const { image, author, title, content, category } = mockdata;
  return (
    
    
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px",
          padding:"50px"
        }}
      >
        <Card withBorder radius="md" p="md" className={classes.card}>
          <Card.Section>
            <Image src={image} alt={title} />
          </Card.Section>
        <div
        style={{padding:"20px"}}>
          <Card.Section className={classes.section} mt="md">
            <Group justify="apart">
              <Text fz="lg" fw={500} style={{fontSize:"30px"}}>
                {title}
              </Text>
              <Badge size="sm" variant="light">
                {author}
              </Badge>
            </Group>
            <Text fz="sm" mt="xs">
              {content}
            </Text>
          </Card.Section>

          <Card.Section className={classes.section}>
            <Text mt="md" className={classes.label} c="dimmed">
              Perfect for you, if you enjoy
            </Text>
            <Group gap={7} mt={5}>
              {category}
            </Group>
          </Card.Section>
          {/* <Group mt="xs"> */}
          {/* <Button radius="md" style={{ flex: 1 }}> */}
          {/* /     Show details */}
          {/* </Button> */}
          {/* <ActionIcon variant="default" radius="md" size={36}> */}
          {/* <IconHeart className={classes.like} stroke={1.5} /> */}
          {/* </ActionIcon> */}
          {/* </Group> */}
          </div>
        </Card>
      </div>
    
  );
}

export const postDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return res.data;
};

export default PostDetailsPage;
