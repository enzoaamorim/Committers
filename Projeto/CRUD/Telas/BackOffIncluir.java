package Telas;
import java.util.Scanner;

public class BackOffIncluir {
    public static void incluirUser(){
        Scanner scan = new Scanner(System.in);
        System.out.println("                      Incluir Usuario");
        System.out.println("");
        System.out.println("Nome -->");
        String nomeUser = scan.next();
        System.out.println("CPF -->");
        String cpfUser = scan.next();
        System.out.println("Email -->");
        String emailUser = scan.next();
        System.out.println("Grupo (Admin/Estoquista) -->");
        String grupoUser = scan.next();
        System.out.println("Senha -->");
        String senhaUser = scan.next();
        System.out.println("Repetir Senha -->");
        String senhaUser2 = scan.next();
        System.out.println("------------------------------------------------------------------------");
        System.out.println("");
        System.out.println("");
        System.out.println("Salvar (Y/N)");
        String respostaUser = scan.next().toUpperCase();

        if (respostaUser.equals("Y") && senhaUser2.equals(senhaUser)) {
            System.out.println("Usuario incluido com sucesso!");
        }

        else{
            System.out.println("Usuario não pode ser incluido");
        }
        
        
    }
}
