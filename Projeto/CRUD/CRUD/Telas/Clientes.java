package Telas;

public class Clientes {
    
    private String nomeCliente;
    private String cpfCliente;
    private String emailCliente;
    private String grupoCliente;
    private String senhaCliente;
    private String repSenhaCliente;

    public Clientes() {
    }

    public Clientes(String emailCliente, String senhaCliente) {
        this.emailCliente = emailCliente;
        this.senhaCliente = senhaCliente;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public String getCpfCliente() {
        return cpfCliente;
    }

    public void setCpfCliente(String cpfCliente) {
        this.cpfCliente = cpfCliente;
    }

    public String getEmailCliente() {
        return emailCliente;
    }

    public void setEmailCliente(String emailCliente) {
        this.emailCliente = emailCliente;
    }

    public String getGrupoCliente() {
        return grupoCliente;
    }

    public void setGrupoCliente(String grupoCliente) {
        this.grupoCliente = grupoCliente;
    }

    public String getSenhaCliente() {
        return senhaCliente;
    }

    public void setSenhaCliente(String senhaCliente) {
        this.senhaCliente = senhaCliente;
    }

    public String getRepSenhaCliente() {
        return repSenhaCliente;
    }

    public void setRepSenhaCliente(String repSenhaCliente) {
        this.repSenhaCliente = repSenhaCliente;
    }
    
}
