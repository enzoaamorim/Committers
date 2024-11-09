package Ecomerce4.dev.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import Ecomerce4.dev.modal.Carrinho;
import Ecomerce4.dev.service.CarrinhoService;



@RestController
@CrossOrigin("*")
@RequestMapping("/carrinho")
public class CarrinhoController {

    private final CarrinhoService carrinhoService;

    public CarrinhoController(CarrinhoService carrinhoService) {
        this.carrinhoService = carrinhoService;
    }

    @GetMapping
    public ResponseEntity<List<Carrinho>> listarCarrinho() {
        List<Carrinho> itensCarrinho = carrinhoService.listarCarrinho();
        return ResponseEntity.ok(itensCarrinho);
    }

    @PostMapping
    public ResponseEntity<?> criarCarrinho(
            @RequestParam("imagem") MultipartFile imagem,
            @RequestParam("nome") String nome,
            @RequestParam("valor") Double valor,
            @RequestParam("quantidade") Integer quantidade) {
        try {
            byte[] imagemBytes = imagem.getBytes();
            Carrinho carrinho = new Carrinho();
            carrinho.setNome(nome);
            carrinho.setValor(valor);
            carrinho.setQuantidade(quantidade);
            carrinho.setImagem(imagemBytes);

            Carrinho novoCarrinho = carrinhoService.criaCarrinho(carrinho);

            return ResponseEntity.status(201).body(novoCarrinho);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao processar a imagem.");
        }
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<Carrinho> atualizarItemCarrinho(@PathVariable Integer id, @RequestBody Carrinho novoItemCarrinho) {
        Carrinho itemAtualizado = carrinhoService.atualizarItemCarrinho(id, novoItemCarrinho);
        return ResponseEntity.ok(itemAtualizado);
    }

    @PutMapping("/{id}/quantidade")
    public ResponseEntity<Carrinho> atualizarQuantidade(@PathVariable Integer id, @RequestBody Map<String, Integer> quantidade) {
        Carrinho itemAtualizado = carrinhoService.atualizarQuantidade(id, quantidade.get("quantidade"));
        return ResponseEntity.ok(itemAtualizado);
    }

    @PostMapping("/{id}/imagem")
    public ResponseEntity<String> salvarImagemDoItemCarrinho(@PathVariable Integer id, @RequestParam("imagem") MultipartFile imagem) {
        try {
            carrinhoService.salvarImagemDoItemCarrinho(id, imagem);
            return ResponseEntity.ok("Imagem salva com sucesso.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar imagem.");
        }
    }

    @GetMapping("/{id}/imagem")
    public ResponseEntity<byte[]> obterImagemDoItemCarrinho(@PathVariable Integer id) {
        byte[] imagem = carrinhoService.obterImagemDoItemCarrinho(id);
        return ResponseEntity.ok(imagem);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Carrinho> obterItemCarrinhoPorId(@PathVariable Integer id) {
        Carrinho itemCarrinho = carrinhoService.obterItemCarrinhoPorId(id);
        if (itemCarrinho != null) {
            return ResponseEntity.ok(itemCarrinho);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirItemCarrinho(@PathVariable Integer id) {
        carrinhoService.excluirItemCarrinho(id);
        return ResponseEntity.noContent().build();
    }
}

