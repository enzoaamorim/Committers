package Telas;

import java.util.Scanner;

public class OpUserAltSenha {
    public static void AlterarSenha(){
        int retorno;
        do{
        Scanner scan = new Scanner(System.in);
        System.out.println("Id: ");//puxar no BD
        System.out.println("Nome: ");//puxar no BD
        System.out.println("CPF: ");//puxar no BD
        System.out.println("E-Mail");//puxar no BD
        System.out.println("Status: ");//puxar no BD
        System.out.println("Grupo: ");//puxar no BD
        System.out.println("____________________________________________");//puxar no BD

        System.out.println("                       Alterar Senha");//puxar no BD
        System.out.println("Nova Senha: ");
        String senha1 = scan.nextLine();
        System.out.println("Repetir nova senha: ");
        String senha2 = scan.nextLine();
        System.out.println("Salvar (Y/N)");
        String respostaUser = scan.nextLine().toUpperCase();
        retorno = 1;

        if(respostaUser.equals("Y") && senha1.equals(senha2)){
            System.out.println("Salvar no Banco de dados"); // salvar no banco de dados
        }
        else{
             retorno = 0;
            System.out.println("ERRO REPORTADO TENTE NOVAMENTE!");
        }

    }

    while(retorno!=1);
    }
}

