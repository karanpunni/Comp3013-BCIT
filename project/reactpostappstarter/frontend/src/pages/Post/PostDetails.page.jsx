import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { NavLink } from "react-router-dom";

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
import useBoundStore from "../../store/Store";

function PostDetailsPage() {
  const { user } = useBoundStore((state) => state);
  const postsDetail = useLoaderData();

  const mockdata = {
    image: postsDetail[0].image,
    author: postsDetail[1].email,
    title: postsDetail[0].title,
    content: postsDetail[0].content,
    category: postsDetail[0].category,
  };

  const { image, author, title, content, category } = mockdata;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
        padding: "50px",
      }}
    >
      <Card withBorder radius="md" p="md" className={classes.card}>
        <Card.Section>
          <Image src={image} alt={title} />
        </Card.Section>
        <div style={{ padding: "20px" }}>
          <Card.Section className={classes.section} mt="md">
            <Group justify="apart">
              <Text fz="lg" fw={500} style={{ fontSize: "30px" }}>
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

            <Group mt="xs">
              {user.id == postsDetail[0].id ? (
                <NavLink to={"/posts/"+(postsDetail[0].id)+"/edit"}>
                <Button radius="md" style={{ flex: 1 }}>
                  Edit
                </Button>
              </NavLink>                
              ) : (
                ""
              )}
            </Group>
          </Card.Section>
        
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
