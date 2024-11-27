package pi.senac.committers.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import pi.senac.committers.modal.EnderecoFAT;
import pi.senac.committers.repository.IEnderecoFAT;


@Service
public class EnderecoFATService {
    private IEnderecoFAT repository;

    public EnderecoFATService(IEnderecoFAT repository) {
        this.repository = repository;
    }

    public List<EnderecoFAT> listarEndereco() {
        List<EnderecoFAT> lista = repository.findAll();
        return lista;
    }

    public EnderecoFAT criarEndereco(EnderecoFAT endereco) {
        EnderecoFAT enderecoNovo = repository.save(endereco);
        return enderecoNovo;
    }

    public EnderecoFAT editarEndereco(Integer id, EnderecoFAT enderecoAtualizado) {
        Optional<EnderecoFAT> optionalEndereco = repository.findById(id);

        if (optionalEndereco.isPresent()) {
            EnderecoFAT enderecoExistente = optionalEndereco.get();

            enderecoExistente.setCep(enderecoAtualizado.getCep());
            enderecoExistente.setLogradouro(enderecoAtualizado.getLogradouro());
            enderecoExistente.setNumero(enderecoAtualizado.getNumero());
            enderecoExistente.setComplemento(enderecoAtualizado.getComplemento());
            enderecoExistente.setBairro(enderecoAtualizado.getBairro());
            enderecoExistente.setCidade(enderecoAtualizado.getCidade());
            enderecoExistente.setUf(enderecoAtualizado.getUf());

            EnderecoFAT enderecoSalvo = repository.save(enderecoExistente);
            return enderecoSalvo;
        } else {
            return null;
        }
    }

    public void deletarEndereco(Integer id) {
        repository.deleteById(id);
    }
}
