import { TextInput, Button, Group, Box } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

function EditPostPage() {
  const navigate = useNavigate();
  const postsDetail = useLoaderData();
  const form = useForm({
    initialValues: {
      title: postsDetail.title,
      category: postsDetail.category,
      image: postsDetail.image,
      content: postsDetail.content,
      id:postsDetail.id
    },
  });






  const handleSubmit = async (values) => {
    const res = await axios.post(`${DOMAIN}/api/update`, values);
    navigate("/posts");
    if (res?.data.success) {
      navigate("/posts");
    }
  };

  return (
    <Box maw={300} mx="auto">
     
      <form onSubmit={form.onSubmit(handleSubmit)}>
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

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export const EditDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}/edit`);
  return res.data;
};



export default EditPostPage;
