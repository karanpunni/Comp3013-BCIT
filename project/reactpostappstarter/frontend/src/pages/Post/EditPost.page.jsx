import {
  TextInput,
  Button,
  Group,
  Paper,
  Title,
  Container,
} from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import classes from "./CreateandEditTitle.module.css";

function EditPostPage() {
  const navigate = useNavigate();
  const postsDetail = useLoaderData();
  const form = useForm({
    initialValues: {
      title: postsDetail.title,
      category: postsDetail.category,
      image: postsDetail.image,
      content: postsDetail.content,
      id: postsDetail.id,
    },
  });

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(`${DOMAIN}/api/update`, values);
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container size={420} my={40}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Title ta="center" className={classes.title}>
          Edit Post
        </Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            type="hidden"
            placeholder="Enter a Id"
            {...form.getInputProps("id")}
          />
          <TextInput
            label="Title"
            placeholder="Enter a Title"
            {...form.getInputProps("title")}
          />

          <TextInput
            label="Category"
            placeholder="Enter a Category"
            {...form.getInputProps("category")}
          />
          <TextInput
            label="Image"
            placeholder="Enter an Image"
            {...form.getInputProps("image")}
          />

          <TextInput
            label="Content"
            placeholder="Enter some content"
            {...form.getInputProps("content")}
          />

          <Button fullWidth mt="xl" type="submit">
            Submit
          </Button>
        </Paper>
      </form>
    </Container>
  );
}

export const EditDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}/edit`);
  return res.data;
};

export default EditPostPage;
