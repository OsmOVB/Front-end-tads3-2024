/*Exercício:
usar hook form para criar um formulário com os campos:
- Utilizar a rota POST https://jsonplaceholder.typicode.com/comments
- Body da rota 
{
    "postId": 1, // Passar um id fictício, igual ao input de users
    "name": "id labore ex et quam laborum", // Campo obrigatório
    "email": "Eliseo@gardner.biz", // Campo obrigatório
    "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium" 
  }
*/
import { Flex, Input, Textarea, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Header from "../components/Header";

export const PostExec = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    try {
      const result = await axios.post("https://jsonplaceholder.typicode.com/comments", {
        postId: data.postId,
        name: data.name,
        email: data.email,
        body: data.body,
      });
      console.log(result.data);
      alert("Comentário criado com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Erro ao criar o comentário!");
    }
  };

  return (
    <div>
      <Header title="Cadastro de Comentários" />
      <Flex
        direction="column"
        gap={8}
        padding={8}
        justifyContent="center"
        alignItems="center"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Digite o id do post"
            {...register("postId", { required: true })}
            style={{ width: 600 }}
          />
          {errors.postId && <span> * Este campo é obrigatório</span>}
          
          <Input
            placeholder="Digite o nome do comentário"
            {...register("name", { required: true })}
            style={{ width: 600 }}
          />
          {errors.name && <span> * Este campo é obrigatório</span>}
          
          <Input
            placeholder="Digite o email"
            {...register("email", { required: true })}
            style={{ width: 600 }}
          />
          {errors.email && <span> * Este campo é obrigatório</span>}
          
          <Textarea
            placeholder="Digite o conteúdo do comentário"
            {...register("body")}
            style={{ width: 600 }}
          />
          <Button colorScheme="orange" type="submit">
            + Criar comentário
          </Button>
        </form>
      </Flex>
    </div>
  );
};

