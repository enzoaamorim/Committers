package Ecomerce4.dev.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Ecomerce4.dev.modal.Carrinho;



public interface ICarrinho extends JpaRepository<Carrinho, Integer> {
  

}

