package Ecomerce4.dev.Repository;

import Ecomerce4.dev.modal.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;


public interface IUsuario extends JpaRepository<Usuario, Integer>{
  Usuario findByEmail(String email);
}
