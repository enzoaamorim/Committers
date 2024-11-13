package pi.senac.committers.repository;

import pi.senac.committers.modal.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;


public interface IUsuario extends JpaRepository<Usuario, Integer>{
  Usuario findByEmail(String email);
}
