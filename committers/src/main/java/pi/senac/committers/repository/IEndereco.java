package pi.senac.committers.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pi.senac.committers.modal.Endereco;

public interface IEndereco extends JpaRepository <Endereco, Integer >{

}