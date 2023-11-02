import { User } from "@/@Types/User";
import { BrDateFormat } from "@/utils/Formatter";
import { Avatar, Badge, Table, Group, Text } from "@mantine/core";

export function UsersTable({ users }: { users: User[] }) {
  const rows = users.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} radius={40} />
          <div>
            <Text fz="sm" fw={500}>
              {item.nome}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.login}
            </Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>{item.role}</Table.Td>
      <Table.Td>{BrDateFormat.format(new Date(item.dataCadastro))}</Table.Td>
      <Table.Td>
        {item.ativo ? (
          <Badge fullWidth variant="light">
            Ativo
          </Badge>
        ) : (
          <Badge color="gray" fullWidth variant="light">
            Desabilitado
          </Badge>
        )}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Usuário</Table.Th>
            <Table.Th>Cargo</Table.Th>
            <Table.Th>Data cadastro</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
