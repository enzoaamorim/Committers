package Telas;

import java.util.Scanner;

public class BackOfficeOpUser {
    public static void OptionsUser(){
        Scanner scan = new Scanner(System.in);
        System.out.println("                                            Opção de edição de usuário");
        System.out.println("Id: "); // puxa no BD
        System.out.println("Nome: "); // puxa no BD
        System.out.println("Cpf: "); // puxa no BD
        System.out.println("E-mail: "); // puxa no BD
        System.out.println("Status: "); // puxa no BD
        System.out.println("Grupo: "); // puxa no BD
        System.out.println("________________________________________________");
        System.out.println("Opções");
        System.out.println("1) Alterar Usuario");
        System.out.println("2) Alterar Senha");
        System.out.println("3) Ativar/Desativar");
        System.out.println("4) Voltar Listar Usuario");

        System.out.println("Entro com as respectivas opções (1,2,3,4) -->");
        int escolhaUser = scan.nextByte();

        switch (escolhaUser) {
            case 1: //puxar alterar user
                OpUserAltUser alterarUser = new OpUserAltUser();
                alterarUser.AlterarUsuario();
                break;
            
            case 2: //puxar alterar senha
                
                break;
            case 3: //puxar ativar / desativar
                
                break;
            case 4: //puxar list user
            
                
                break;


            default:
                break;
        }
    }
}
