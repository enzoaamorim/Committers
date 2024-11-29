package pi.senac.committers.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import pi.senac.committers.repository.IEndereco;
import pi.senac.committers.modal.Endereco;

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

    public Endereco listarID(Integer id){
        Optional<Endereco> optionalEnderecoLista = repository.findById(id);

        if(optionalEnderecoLista.isPresent()){
            var endereco = optionalEnderecoLista.get();
            return endereco;
        } else{
            return null;
        }
    }
}

