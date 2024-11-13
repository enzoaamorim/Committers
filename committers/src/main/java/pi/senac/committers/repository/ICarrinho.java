package pi.senac.committers.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pi.senac.committers.modal.Carrinho;



public interface ICarrinho extends JpaRepository<Carrinho, Integer> {
  

}

