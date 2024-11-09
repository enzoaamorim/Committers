package Ecomerce4.dev.controller;
import java.util.*;
import java.io.IOException;
import java.math.BigDecimal;
//import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
//import Ecomerce4.dev.Repository.IProduto;
import Ecomerce4.dev.modal.Produto;
import Ecomerce4.dev.service.ProdutoService;
//import jakarta.validation.Valid;
import org.springframework.web.multipart.*;



@RestController
@CrossOrigin("*")
@RequestMapping("/produtos")
public class ProdutoController{
    private ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }
    @GetMapping
    public ResponseEntity<List<Produto>> listaProdutos(){
        return ResponseEntity.status(200).body(produtoService.listaProdutos());
    }
    
    @PostMapping
    public ResponseEntity<?> criarProduto(@RequestParam("imagem") MultipartFile imagem, @RequestParam("nome") String nome, @RequestParam("valor") BigDecimal valor, @RequestParam("quantidade") Integer quantidade, @RequestParam("avaliacao") Integer avaliacao, @RequestParam("descricao") String descricao) {
        try {
            // Crie um novo produto com os dados recebidos
            byte[] imagemBytes = imagem.getBytes();
            Produto produto = new Produto();
            produto.setNome(nome);
            produto.setValor(valor);
            produto.setQuantidade(quantidade);
            produto.setAvaliacao(avaliacao);
            produto.setDescricao(descricao);
            produto.setImagem(imagemBytes);
            
            Produto novoProduto = produtoService.criaProduto(produto);
            
            return ResponseEntity.status(201).body(novoProduto);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao processar a imagem.");
        }
    }
    @PutMapping
    public ResponseEntity<Produto> editarProduto(@RequestBody Produto produtos){
        return ResponseEntity.status(200).body(produtoService.editProduto(produtos));
    }
     @PostMapping("/{id}/imagem")
    public ResponseEntity<String> adicionarImagem(@PathVariable Integer id, @RequestParam("imagem") MultipartFile imagem) {
        try {
            produtoService.salvarImagem(id, imagem);
            return ResponseEntity.ok("Imagem adicionada com sucesso.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao adicionar imagem.");
        }
    }

    @GetMapping("/{id}/imagem")
    public ResponseEntity<byte[]> obterImagem(@PathVariable Integer id) {
        byte[] imagem = produtoService.obterImagem(id);
        if (imagem != null) {
            return ResponseEntity.ok(imagem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

    @GetMapping("/{id}")
public ResponseEntity<Produto> obterProdutoPorId(@PathVariable Integer id) {
    Produto produto = produtoService.obterProdutoPorId(id);
    if (produto != null) {
        return ResponseEntity.ok(produto);
    } else {
        return ResponseEntity.notFound().build();
    }
}

}