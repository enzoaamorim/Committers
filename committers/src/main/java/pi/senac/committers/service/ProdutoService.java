package pi.senac.committers.service;

import org.springframework.stereotype.*;
import org.springframework.web.multipart.*;

import java.io.IOException;
import java.util.*;

import pi.senac.committers.repository.IProduto;
import pi.senac.committers.modal.Produto;

@Service
public class ProdutoService {
    private IProduto repository;
     
    public ProdutoService(IProduto repository) {
      this.repository = repository;
    }
    public List<Produto> listaProdutos(){
        List<Produto> lista = repository.findAll();
        return lista;
}
public Produto criaProduto(Produto produtos){
  Produto produtosNovos = repository.save(produtos);
  return produtosNovos;
}
public Produto editProduto(Produto produtos){
  Produto produtosNovos = repository.save(produtos);
  return produtosNovos;
}

   public void salvarImagem(Integer id, MultipartFile imagem) throws IOException {
        Produto produto = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Produto não encontrado"));
        produto.setImagem(imagem.getBytes());
        repository.save(produto);
    }

    public byte[] obterImagem(Integer id) {
        Produto produto = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Produto não encontrado"));
        return produto.getImagem();
    }

    public Produto obterProdutoPorId(Integer id) {
      return repository.findById(id).orElse(null);
  }
  
}

