import { TextInput, Button, Paper, Title, Container } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";

import classes from "./CreateandEditTitle.module.css";

function CreatePostPage() {
  const { user } = useBoundStore((state) => state);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      title: "",
      category: "",
      image: "",
      content: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(`${DOMAIN}/api/posts`, [values, user]);
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container size={420} my={40}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Title ta="center" className={classes.title}>
          Create Post
        </Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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

export default CreatePostPage;
