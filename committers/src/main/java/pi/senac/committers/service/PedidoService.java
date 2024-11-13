package pi.senac.committers.service;

    import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import pi.senac.committers.repository.IPedido;
import pi.senac.committers.modal.Pedido;



@Service
public class PedidoService {
    private IPedido repository;

    public PedidoService(IPedido repository) {
        this.repository = repository;
    }

    
    public List<Pedido> listarPedido() {
        return repository.findAll();
    }


    public Pedido criarPedido(Pedido pedido) {
        return repository.save(pedido);
    }

    
    public Pedido editarPedido(Integer id, Pedido pedidoAtualizado) {
        Optional<Pedido> optionalPedido = repository.findById(id);

        if (optionalPedido.isPresent()) {
            Pedido pedidoExistente = optionalPedido.get();

            pedidoExistente.setValor(pedidoAtualizado.getValor());
            pedidoExistente.setQuantidade(pedidoAtualizado.getQuantidade());
            pedidoExistente.setNomeDoCli(pedidoAtualizado.getNomeDoCli());
            pedidoExistente.setCep(pedidoAtualizado.getCep());
            pedidoExistente.setLogradouro(pedidoAtualizado.getLogradouro());
            pedidoExistente.setNumero(pedidoAtualizado.getNumero());
            pedidoExistente.setComplemento(pedidoAtualizado.getComplemento());
            pedidoExistente.setBairro(pedidoAtualizado.getBairro());
            pedidoExistente.setCidade(pedidoAtualizado.getCidade());
            pedidoExistente.setUf(pedidoAtualizado.getUf());
            pedidoExistente.setStatus(pedidoAtualizado.getStatus());

            return repository.save(pedidoExistente);
        } else {
            return null;
        }
    }

    
    public Pedido buscarPedidoPorId(Integer id) {
        Optional<Pedido> optionalPedido = repository.findById(id);
        return optionalPedido.orElse(null);
    }
}

