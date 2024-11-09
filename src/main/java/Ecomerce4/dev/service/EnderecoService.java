package Ecomerce4.dev.service;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import Ecomerce4.dev.Repository.IEndereco;
import Ecomerce4.dev.modal.Endereco;

@Service
public class EnderecoService {
     private IEndereco repository;

    public EnderecoService(IEndereco repository) {
        this.repository = repository;
    }

    public List<Endereco> listarEndereco() {
        List<Endereco> lista = repository.findAll();
        return lista;
    }

    public Endereco criarEndereco(Endereco endereco) {
        Endereco enderecoNovo = repository.save(endereco);
        return enderecoNovo;
    }

    public Endereco editarEndereco(Integer id, Endereco enderecoAtualizado) {
        Optional<Endereco> optionalEndereco = repository.findById(id);

        if (optionalEndereco.isPresent()) {
            Endereco enderecoExistente = optionalEndereco.get();

            enderecoExistente.setCep(enderecoAtualizado.getCep());
            enderecoExistente.setLogradouro(enderecoAtualizado.getLogradouro());
            enderecoExistente.setNumero(enderecoAtualizado.getNumero());
            enderecoExistente.setComplemento(enderecoAtualizado.getComplemento());
            enderecoExistente.setBairro(enderecoAtualizado.getBairro());
            enderecoExistente.setCidade(enderecoAtualizado.getCidade());
            enderecoExistente.setUf(enderecoAtualizado.getUf());

            Endereco enderecoSalvo = repository.save(enderecoExistente);
            return enderecoSalvo;
        } else {
            return null;
        }
    }

    public void deletarEndereco(Integer id) {
        repository.deleteById(id);
    }
}

