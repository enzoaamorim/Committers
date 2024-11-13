package pi.senac.committers.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import pi.senac.committers.repository.ICarrinho;
import pi.senac.committers.modal.Carrinho;


@Service
public class CarrinhoService {
    private ICarrinho repository;

    public CarrinhoService(ICarrinho repository) {
        this.repository = repository;
    }

    public List<Carrinho> listarCarrinho() {
        return repository.findAll();
    }

    public Carrinho criaCarrinho(Carrinho carrinho) {
        return repository.save(carrinho);
    }

    public Carrinho atualizarItemCarrinho(Integer id, Carrinho novoItemCarrinho) {
        Carrinho itemExistente = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Item do carrinho não encontrado"));

        itemExistente.setNome(novoItemCarrinho.getNome());
        itemExistente.setValor(novoItemCarrinho.getValor());
        itemExistente.setQuantidade(novoItemCarrinho.getQuantidade());
        itemExistente.setImagem(novoItemCarrinho.getImagem()); 

        return repository.save(itemExistente);
    }

    public Carrinho atualizarQuantidade(Integer id, Integer quantidade) {
        Carrinho itemCarrinho = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item do carrinho não encontrado"));
        
        itemCarrinho.setQuantidade(quantidade);
        return repository.save(itemCarrinho);
    }

    public void salvarImagemDoItemCarrinho(Integer id, MultipartFile imagem) throws IOException {
        Carrinho itemCarrinho = repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Item do carrinho não encontrado"));

        itemCarrinho.setImagem(imagem.getBytes());
        repository.save(itemCarrinho);
    }

    public byte[] obterImagemDoItemCarrinho(Integer id) {
        Carrinho itemCarrinho = repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Item do carrinho não encontrado"));

        return itemCarrinho.getImagem();
    }

    public Carrinho obterItemCarrinhoPorId(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public void excluirItemCarrinho(Integer id) {
        repository.deleteById(id);
    }
}
