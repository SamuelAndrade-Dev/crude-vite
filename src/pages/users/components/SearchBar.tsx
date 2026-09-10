import z from "zod";
import { Button } from "../../../components/Button";
import { TextField } from "../../../components/TextField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().refine((value) => value.trim().length > 0, {
    message: "O nome não pode estar vazio",
  }),
});

type SearchBarFormData = z.infer<typeof schema>;

interface SearchBarProps {
  onFilter: (data: SearchBarFormData) => void;
  onCreateUser: () => void;
}

export const SearchBar = ({ onFilter, onCreateUser }: SearchBarProps) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(schema),
  });

  const handleClick = () => {
    reset();
    onFilter({ name: "" });
  };

  return (
    <form onSubmit={handleSubmit(onFilter)} className="flex gap-2 items-end">
      <TextField
        label="Buscar usuários"
        placeholder="Digite o nome do usuário"
        {...register("name")}
      />
      <Button size="md" type="submit">
        Buscar
      </Button>
      <Button variant="secondary" size="md" type="button" onClick={handleClick}>
        Limpar
      </Button>
      <Button type="button" onClick={onCreateUser}>
        Cadastrar usuário
      </Button>
    </form>
  );
};
