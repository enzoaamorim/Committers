package pi.senac.committers.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.*;

import java.util.*;

import pi.senac.committers.repository.IClientes;
import pi.senac.committers.modal.Clientes;

@Service
public class ClientesService {
    private IClientes repository;
    private PasswordEncoder passwordEncoder;

    public ClientesService(IClientes repository) {
        this.repository = repository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public List<Clientes> listarClientes() {
        List<Clientes> lista = repository.findAll();
        return lista;
    }

    public Clientes criaCliente(Clientes cliente) {
        String encoder = this.passwordEncoder.encode(cliente.getSenha());
        cliente.setSenha(encoder);
        Clientes clienteNovo = repository.save(cliente);
        return clienteNovo;
    }

    public Clientes editarCliente(Integer id, Clientes clienteAtualizado) {

        Optional<Clientes> optionalCliente = repository.findById(id);

        if (optionalCliente.isPresent()) {
            Clientes clienteExistente = optionalCliente.get();

            clienteExistente.setNome(clienteAtualizado.getNome());
            clienteExistente.setCpf(clienteAtualizado.getCpf());
            clienteExistente.setData(clienteAtualizado.getData());
            clienteExistente.setGenero(clienteAtualizado.getGenero());

            String novaSenha = clienteAtualizado.getSenha();
            if (novaSenha != null) {
                String encoder = this.passwordEncoder.encode(novaSenha);
                clienteExistente.setSenha(encoder);
            }

            Clientes clienteSalvo = repository.save(clienteExistente);
            return clienteSalvo;
        } else {
            return null;
        }
    }

    public Integer validarSenha(Clientes cliente) {
        Clientes clienteExistente = repository.findByEmail(cliente.getEmail());

        if (clienteExistente != null && passwordEncoder.matches(cliente.getSenha(), clienteExistente.getSenha())) {
            return clienteExistente.getId();
        } else {
            return null;
        }
    }

    public Integer buscarIdPorEmail(String email) {
        Clientes clientes = repository.findByEmail(email);

        if (clientes != null) {

            return clientes.getId();

        } else {

            throw new IllegalArgumentException("E-Mail ou Senha Incorretos. Tente Novamente!");

        }
    }

}