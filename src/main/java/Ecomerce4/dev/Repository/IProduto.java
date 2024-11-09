package Ecomerce4.dev.Repository;

import Ecomerce4.dev.modal.Produto;

import org.springframework.data.jpa.repository.JpaRepository;


public interface IProduto extends JpaRepository<Produto, Integer> {
}


